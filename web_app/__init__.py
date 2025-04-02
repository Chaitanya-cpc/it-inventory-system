# web_app/__init__.py
import os
from flask import Flask, render_template
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

# Load environment variables from .env file
# Ensure .env is in the root directory relative to this file's grandparent dir
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), '.env')
print(f"Loading .env file from: {dotenv_path}") # Debug print
load_dotenv(dotenv_path=dotenv_path)


# Initialize extensions - declared globally but configured within the factory
csrf = CSRFProtect()
login_manager = LoginManager()
bcrypt = Bcrypt()

# Configure login view and message category for Flask-Login
login_manager.login_view = 'auth.login' # The route function for the login page
login_manager.login_message_category = 'info' # Flash message category


def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    print("Creating Flask app...")
    app = Flask(__name__, instance_relative_config=True)

    # --- Configuration ---
    secret_key = os.environ.get('SECRET_KEY')
    if not secret_key:
        raise ValueError("No SECRET_KEY set for Flask application. Set it in .env file.")

    app.config.from_mapping(
        SECRET_KEY=secret_key,
        # DATABASE=..., # Consider adding DB path if needed globally
        # Add other default configs here
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.update(test_config)

    # Ensure the instance folder exists (not typically needed unless using instance config)
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # --- Initialize Extensions with the App ---
    print("Initializing extensions...")
    csrf.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app) # Initialize bcrypt here
    print("Extensions initialized.")

    # --- Database Setup (Ensure connection works) ---
    # Test DB connection on startup (optional)
    # from inventory import database
    # try:
    #     conn = database.get_db_connection()
    #     database.close_db_connection(conn)
    #     print("Database connection test successful.")
    # except Exception as e:
    #     print(f"Database connection test failed: {e}")


    # --- User Loader for Flask-Login ---
    @login_manager.user_loader
    def load_user(user_id):
        from inventory import crud
        # User IDs are stored as strings in the session, convert to int
        try:
            return crud.get_user_by_id(int(user_id))
        except ValueError:
            return None

    # --- Register Blueprints ---
    print("Registering blueprints...")
    from . import routes # Main app routes
    app.register_blueprint(routes.bp)

    from . import auth # Authentication routes
    app.register_blueprint(auth.bp)
    print("Blueprints registered.")

    # --- Custom Error Handlers ---
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404

    # Add handlers for 403 (Forbidden), 500 (Internal Server Error) etc. if needed

    print("Flask app created successfully.")
    return app