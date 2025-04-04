# Inventory Management Frontend

## LocalStorage Functionality

This frontend application includes a demo mode that uses browser localStorage to persist data without requiring a backend server. This allows you to:

- Add, edit, and delete items in all sections (Hardware, Categories, Warranties, Subscriptions, etc.)
- Have your data persist between page refreshes and browser sessions
- Test the full functionality of the application without setting up a backend server

Note: LocalStorage data is browser-specific and will be cleared if you clear your browser data.

## Running Without Node.js/npm

If you're seeing `zsh: command not found: npm` error, you don't have Node.js and npm installed on your system. Here are your options:

### Option 1: Install Node.js and npm (Recommended)

#### On macOS (using Homebrew):
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node
```

#### On macOS (without Homebrew):
1. Download the installer from [Node.js website](https://nodejs.org/)
2. Run the installer and follow the instructions

#### Verify installation:
```bash
node -v
npm -v
```

After installation, run these commands in the frontend directory:
```bash
npm install
npm run dev
```

### Option 2: Use a Docker container

If you have Docker installed:

```bash
# Create a Dockerfile
echo 'FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]' > Dockerfile

# Build and run the container
docker build -t inventory-frontend .
docker run -p 3000:3000 inventory-frontend
```

### Option 3: Use a CDN version for development

For quick development without npm, you can use the standalone HTML version:

1. Simply open the `index.html` file in your browser
2. This version loads React and Tailwind CSS from CDNs and has a Tron Legacy-inspired UI

## Running With Node.js/npm (Normal Method)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Troubleshooting TypeScript Issues

If you're seeing TypeScript errors in your IDE:

1. Make sure `src/types/react-types.d.ts` is included in your project
2. Use `// @ts-ignore` before lines with errors as a temporary workaround
3. Set `"strict": false` in tsconfig.json (already done)

## Google Cloud Platform Deployment

### Option 1: Deploy to GCP App Engine

1. Install Google Cloud SDK
   ```bash
   # For macOS
   brew install --cask google-cloud-sdk
   # OR download from https://cloud.google.com/sdk/docs/install
   ```

2. Initialize and authenticate
   ```bash
   gcloud init
   gcloud auth login
   ```

3. Create app.yaml in the frontend directory
   ```yaml
   runtime: nodejs16
   service: frontend

   handlers:
     - url: /static
       static_dir: build/static
       secure: always

     - url: /(.*\.(json|ico|js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))
       static_files: build/\1
       upload: build/.*\.(json|ico|js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)
       secure: always

     - url: /.*
       static_files: build/index.html
       upload: build/index.html
       secure: always
   ```

4. Build and deploy
   ```bash
   npm run build
   gcloud app deploy
   ```

### Option 2: Deploy to GCP Compute Engine

1. Create a Compute Engine VM instance
   - Go to GCP Console > Compute Engine > VM Instances
   - Click "Create Instance"
   - Choose machine type (e2-micro is usually sufficient for testing)
   - Select your preferred boot disk (Debian/Ubuntu recommended)
   - Allow HTTP/HTTPS traffic
   - Click "Create"

2. SSH into your instance
   ```bash
   gcloud compute ssh --zone "YOUR_ZONE" "YOUR_INSTANCE_NAME"
   ```

3. Install dependencies
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm nginx
   ```

4. Clone repository and setup app
   ```bash
   git clone YOUR_REPO_URL
   cd inventory_management_IT/frontend
   npm install
   npm run build
   ```

5. Configure Nginx
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add the following configuration:
   ```nginx
   server {
     listen 80;
     server_name YOUR_IP_OR_DOMAIN;
     root /path/to/inventory_management_IT/frontend/build;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
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

### Option 3: Deploy with Docker to Google Cloud Run

1. Create a production Dockerfile in the frontend directory
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Create nginx.conf
   ```nginx
   server {
     listen 80;
     root /usr/share/nginx/html;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

3. Install Google Cloud SDK and authenticate

4. Build and push to Google Container Registry
   ```bash
   # Build the image
   docker build -t gcr.io/YOUR_PROJECT_ID/inventory-frontend .
   
   # Configure Docker to use gcloud credentials
   gcloud auth configure-docker
   
   # Push the image
   docker push gcr.io/YOUR_PROJECT_ID/inventory-frontend
   ```

5. Deploy to Cloud Run
   ```bash
   gcloud run deploy inventory-frontend \
     --image gcr.io/YOUR_PROJECT_ID/inventory-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Connecting to Backend API

Make sure to update the API URL in your `.env` file or environment variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

For local development, use:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Troubleshooting Common Issues

### "The default export is not a React Component in page" Error

This error commonly occurs with the `/dashboard/tech/add` page or similar pages. If you encounter this:

1. Check that the page component has a default export that is a valid React component:
   ```tsx
   export default function TechAddPage() {
     // Component code
   }
   ```

2. Make sure the file is properly formatted as a React component with the 'use client' directive:
   ```tsx
   'use client';
   
   import { useState } from 'react';
   // other imports
   
   export default function TechAddPage() {
     // Component code
   }
   ```

3. If the page is empty or missing, you may need to create the component file with proper structure.

### Port Already in Use

If you see "That port is already in use" when starting the development server:

1. Find the process using the port:
   ```bash
   lsof -i :3000
   ```

2. Kill the process:
   ```bash
   kill -9 <PID>
   ```

3. Or use a different port:
   ```bash
   npm run dev -- -p 3001
   ``` 