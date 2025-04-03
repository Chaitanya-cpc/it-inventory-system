FROM python:3.10-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=inventory_project.settings

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Run migrations and collect static files when building the image
RUN python manage.py collectstatic --noinput

# Expose port for Gunicorn
EXPOSE 8000

# Command to run when container starts
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "inventory_project.wsgi"] 