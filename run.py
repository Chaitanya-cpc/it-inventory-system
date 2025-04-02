# run.py
from web_app import create_app

# Create the Flask app instance using the factory
app = create_app()

if __name__ == "__main__":
    # Run the Flask development server
    # Debug=True automatically reloads on code changes and provides detailed errors
    # In production, use a proper WSGI server like Gunicorn or Waitress
    app.run(debug=True)