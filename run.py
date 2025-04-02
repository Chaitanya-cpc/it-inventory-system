# run.py
import os
import click
from web_app import create_app
from inventory import database, crud

# Create the Flask app instance using the factory pattern
app = create_app()

# --- CLI Commands integrated with Flask (Optional but useful) ---
@app.cli.command("init-db")
def init_db_command():
    """Clears existing data and creates new tables."""
    database.initialize_database()
    print("Initialized the database.")

@app.cli.command("create-user")
@click.argument("username")
@click.password_option() # Prompts securely for password
def create_user_command(username, password):
    """Creates a new user."""
    if crud.get_user_by_username(username):
        print(f"User '{username}' already exists.")
        return
    user = crud.create_user(username, password)
    if user:
        print(f"User '{username}' created successfully.")
    else:
        print("Failed to create user.")

# --- Run the Development Server ---
if __name__ == "__main__":
    # Use environment variable for debug or default to False
    debug_mode = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    # Run the Flask development server
    # host='0.0.0.0' makes it accessible on your network (use with caution)
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
    # In production, use a proper WSGI server like Gunicorn or Waitress:
    # Example: gunicorn --workers 4 --bind 0.0.0.0:5000 run:app