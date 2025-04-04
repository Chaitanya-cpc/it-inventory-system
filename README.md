# Inventory Management System

A personal web tool for asset and inventory management with a Tron Legacy-inspired UI. Built with Next.js and Django REST Framework.

![Tron Legacy Inspired UI](frontend/public/screenshot.png)

## Features

- Secure authentication system with JWT
- Dashboard with inventory statistics
- Asset management by categories
- Subscription and warranty tracking
- Modern Tron Legacy inspired UI
- Responsive design for mobile and desktop
- File upload for documents and images
- Toast notifications for user feedback
- Error boundary for graceful error handling
- Form validation for data integrity
- LocalStorage persistence for demo/offline use

## Project Structure

```
inventory_management_IT/
├── backend/               # Django REST API
│   ├── api/               # API endpoints
│   ├── inventory_project/ # Django settings
│   ├── Dockerfile         # Backend Docker config
│   ├── requirements.txt   # Python dependencies
│   └── app.yaml           # GCP App Engine config
│
├── frontend/              # Next.js frontend
│   ├── src/               # Source code
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── styles/        # CSS styles
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   ├── index.html         # Standalone HTML version
│   └── Dockerfile         # Frontend Docker config
```

## Key Components

### Frontend Components
- **FileUpload**: Drag-and-drop file upload with preview
- **ErrorBoundary**: Catches and displays errors gracefully
- **Toast**: Customizable notification system
- **Sidebar**: Responsive navigation with collapsible design

### Utility Functions
- **ServerResponse**: Mock API utilities for development
- **FormValidation**: Form validation helpers
- **Toast Context**: Global toast notification management
- **LocalStorage**: Client-side data persistence for offline functionality

## Quick Start

### Backend (Django REST API)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server (default port 8000)
python manage.py runserver

# If port 8000 is already in use, specify another port:
python manage.py runserver 8080
```

### Frontend (Next.js)

```bash
# Navigate to frontend directory
cd frontend

# Option 1: Use standalone HTML version (no npm required)
# Simply open index.html in your browser

# Option 2: Install dependencies and run dev server (requires Node.js/npm)
npm install
npm run dev
```

## Demo Mode vs API Mode

The application can run in two modes:

1. **Demo Mode (Default)**: Uses browser localStorage to persist data without requiring a backend server. All data is stored in the browser and will be lost if the browser storage is cleared.

2. **API Mode**: Connects to the Django backend API for data persistence. To switch to this mode:
   - Make sure the backend server is running
   - Update the `.env` file in the frontend directory with your backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api  # or your custom port
   ```
   - Uncomment the API call code in the relevant components

## Port Configuration

- Frontend default port: 3000
- Backend default port: 8000

If you encounter port conflicts, you can:
- For backend: Use `python manage.py runserver <port>` (e.g., `python manage.py runserver 8080`)
- For frontend: Update the `dev` script in `package.json` to specify an alternate port:
  ```json
  "dev": "next dev -p 3001"
  ```

## Troubleshooting

### Common Issues:

1. **"The port is already in use"**:
   - Use a different port as described in the Port Configuration section
   - Identify and stop the process using the port: `lsof -i :<port>` then `kill <PID>`

2. **"The default export is not a React Component"**:
   - Ensure all page components have a proper React component export
   - Check file imports and formats in the problematic page

3. **Form submissions not working**:
   - In Demo Mode, ensure localStorage is enabled in your browser
   - In API Mode, check the backend server connections and API endpoints

## Deployment on Google Cloud Platform

This project can be deployed to GCP in multiple ways. Here are the recommended approaches:

### Option 1: Google App Engine (Recommended for Simplicity)

#### Deploy Backend:

1. Install Google Cloud SDK
   ```bash
   brew install --cask google-cloud-sdk  # macOS
   ```

2. Initialize and authenticate
   ```bash
   gcloud init
   gcloud auth login
   ```

3. Deploy backend
   ```bash
   cd backend
   gcloud app deploy
   ```

#### Deploy Frontend:

1. Update API URL in `.env` file to point to your deployed backend
   ```
   NEXT_PUBLIC_API_URL=https://backend-api-dot-your-project-id.appspot.com/api
   ```

2. Deploy frontend
   ```bash
   cd frontend
   npm run build
   gcloud app deploy
   ```

### Option 2: Google Compute Engine (More Control)

#### Create a VM instance:

1. Go to GCP Console > Compute Engine > VM Instances
2. Click "Create Instance"
3. Choose machine type (e2-medium recommended)
4. Select boot disk (Debian/Ubuntu)
5. Allow HTTP/HTTPS traffic
6. Click "Create"

#### Deploy application:

1. SSH into VM
   ```bash
   gcloud compute ssh --zone "YOUR_ZONE" "YOUR_INSTANCE_NAME"
   ```

2. Install dependencies
   ```bash
   sudo apt update
   sudo apt install -y git docker.io docker-compose nginx
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. Clone repository
   ```bash
   git clone YOUR_REPO_URL
   cd inventory_management_IT
   ```

4. Create docker-compose.yml
   ```yaml
   version: '3'
   
   services:
     backend:
       build: ./backend
       restart: always
       ports:
         - "8000:8000"
       environment:
         - DEBUG=False
         - SECRET_KEY=your-secret-key
         - ALLOWED_HOSTS=your-domain.com,localhost
     
     frontend:
       build: ./frontend
       restart: always
       ports:
         - "3000:80"
       depends_on:
         - backend
   ```

5. Configure Nginx
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   
       location /api {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

6. Restart Nginx
   ```bash
   sudo systemctl restart nginx
   ```

7. Start the application
   ```bash
   sudo docker-compose up -d
   ```

### Option 3: Google Cloud Run (Serverless)

#### Deploy Backend:

1. Build and push backend container
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/inventory-backend
   
   gcloud run deploy inventory-backend \
     --image gcr.io/YOUR_PROJECT_ID/inventory-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

#### Deploy Frontend:

1. Update API URL to point to the backend Cloud Run service
   ```
   NEXT_PUBLIC_API_URL=https://inventory-backend-xxxx-xx.a.run.app/api
   ```

2. Build and push frontend container
   ```bash
   cd frontend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/inventory-frontend
   
   gcloud run deploy inventory-frontend \
     --image gcr.io/YOUR_PROJECT_ID/inventory-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

## Security Considerations

For production deployment:

1. Use a proper secret key for Django (do not use the one in app.yaml)
2. Set up a PostgreSQL database with Cloud SQL instead of SQLite
3. Configure proper ALLOWED_HOSTS in Django settings
4. Set up HTTPS with proper SSL certificates
5. Implement proper environment variable management for secrets
6. Configure appropriate IAM permissions for GCP services

## Browser Support

The application is optimized for modern browsers:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the LICENSE file for details. 