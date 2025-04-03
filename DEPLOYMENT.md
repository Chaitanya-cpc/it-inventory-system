# Deploying to Google Cloud Platform

This guide describes how to deploy the Inventory Management System to Google Cloud Platform (GCP).

## Prerequisites

1. A GCP account with billing enabled
2. Familiarity with basic GCP services
3. The `gcloud` CLI installed on your local machine
4. A domain name (optional, but recommended)

## Step 1: Create a GCP Project

1. Go to the [GCP Console](https://console.cloud.google.com/).
2. Create a new project for your Inventory Management System.
3. Note your Project ID, you'll need it for future steps.

## Step 2: Set Up a Virtual Machine Instance

1. Navigate to Compute Engine > VM Instances
2. Click "Create Instance"
3. Choose a name for your instance
4. Select a region that's geographically close to your users
5. Choose machine type:
   - For small/personal use: e2-small or e2-medium
   - For larger deployments: e2-standard-2 or higher
6. Boot disk:
   - Choose "Ubuntu 20.04 LTS"
   - Size: At least 20GB
7. Under "Firewall", check both "Allow HTTP traffic" and "Allow HTTPS traffic"
8. Click "Create"

## Step 3: Set Up the VM

1. Connect to your VM using SSH from the GCP Console
2. Update the package list:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. Install required system packages:
   ```bash
   sudo apt install -y python3-pip python3-venv postgresql postgresql-contrib nginx git
   ```

4. Install Node.js and npm:
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

## Step 4: Configure PostgreSQL

1. Access PostgreSQL:
   ```bash
   sudo -u postgres psql
   ```

2. Create a database and user:
   ```sql
   CREATE DATABASE inventory_db;
   CREATE USER inventory_user WITH PASSWORD 'secure-password-here';
   GRANT ALL PRIVILEGES ON DATABASE inventory_db TO inventory_user;
   ALTER ROLE inventory_user SET client_encoding TO 'utf8';
   ALTER ROLE inventory_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE inventory_user SET timezone TO 'UTC';
   \q
   ```

## Step 5: Clone and Configure the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/inventory_management_IT.git
   cd inventory_management_IT
   ```

2. Set up the backend:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Create a `.env` file with production settings:
   ```bash
   cat > .env << EOF
   SECRET_KEY=your-secure-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com,your-ip-address
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=inventory_db
   DB_USER=inventory_user
   DB_PASSWORD=secure-password-here
   DB_HOST=localhost
   DB_PORT=5432
   CORS_ALLOWED_ORIGINS=https://your-domain.com
   EOF
   ```

4. Apply migrations and create a superuser:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py collectstatic
   ```

5. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

6. Create a `.env.local` file:
   ```bash
   cat > .env.local << EOF
   NEXT_PUBLIC_API_URL=https://your-domain.com/api
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   EOF
   ```

7. Build the frontend:
   ```bash
   npm run build
   ```

## Step 6: Set Up Gunicorn

1. Create a systemd service file for Gunicorn:
   ```bash
   sudo nano /etc/systemd/system/inventory.service
   ```

2. Add the following configuration:
   ```ini
   [Unit]
   Description=Inventory Management System
   After=network.target

   [Service]
   User=your-username
   Group=www-data
   WorkingDirectory=/home/your-username/inventory_management_IT/backend
   Environment="PATH=/home/your-username/inventory_management_IT/backend/venv/bin"
   ExecStart=/home/your-username/inventory_management_IT/backend/venv/bin/gunicorn inventory_project.wsgi:application --workers 3 --bind unix:/home/your-username/inventory_management_IT/backend/inventory.sock

   [Install]
   WantedBy=multi-user.target
   ```

3. Start and enable the service:
   ```bash
   sudo systemctl start inventory
   sudo systemctl enable inventory
   ```

## Step 7: Configure Nginx

1. Create an Nginx site configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/inventory
   ```

2. Add the following configuration (replace placeholders with your specific values):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location /api {
           include proxy_params;
           proxy_pass http://unix:/home/your-username/inventory_management_IT/backend/inventory.sock;
       }

       location /admin {
           include proxy_params;
           proxy_pass http://unix:/home/your-username/inventory_management_IT/backend/inventory.sock;
       }

       location /static/ {
           alias /home/your-username/inventory_management_IT/backend/staticfiles/;
       }

       location /media/ {
           alias /home/your-username/inventory_management_IT/backend/media/;
       }

       location / {
           root /home/your-username/inventory_management_IT/frontend/out;
           try_files $uri $uri.html $uri/ /index.html =404;
       }
   }
   ```

3. Create a symbolic link and test the configuration:
   ```bash
   sudo ln -s /etc/nginx/sites-available/inventory /etc/nginx/sites-enabled
   sudo nginx -t
   ```

4. If the test passes, restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## Step 8: Set Up HTTPS with Let's Encrypt (Optional but Recommended)

1. Install Certbot:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. Obtain and install SSL certificates:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. Follow the prompts and Certbot will automatically update your Nginx configuration

## Step 9: Maintenance and Updates

To update your application:

1. Pull the latest changes:
   ```bash
   cd ~/inventory_management_IT
   git pull
   ```

2. Update backend:
   ```bash
   cd backend
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic
   sudo systemctl restart inventory
   ```

3. Update frontend:
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```

4. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## Troubleshooting

- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Check application logs: `sudo journalctl -u inventory`
- Ensure correct file permissions: `sudo chown -R your-username:www-data /home/your-username/inventory_management_IT` 