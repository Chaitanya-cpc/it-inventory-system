# web_app/__init__.py
import os
import datetime # <--- Import datetime module
from flask import Flask, render_template
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import click # Import click for app.cli commands (if used in run.py)

# Calculate the project root directory dynamically
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Path to the .env file in the project root
dotenv_path = os.path.join(PROJECT_ROOT, '.env')

print(f"Attempting to load .env file from: {dotenv_path}") # Debug print
# Load environment variables from .env file BEFORE accessing os.environ
load_dotenv(dotenv_path=dotenv_path)


# Initialize extensions - declared globally but configured within the factory
csrf = CSRFProtect()
login_manager = LoginManager()
bcrypt = Bcrypt()

# Configure login view and message category for Flask-Login
login_manager.login_view = 'auth.login' # The blueprint_name.route_function_name
login_manager.login_message_category = 'info' # Flash message category


def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    print("Creating Flask app...")
    # Instance path will be PROJECT_ROOT/instance
    app = Flask(__name__, instance_path=os.path.join(PROJECT_ROOT, 'instance'))
    app.config['INSTANCE_FOLDER_PATH'] = os.path.join(PROJECT_ROOT, 'instance')

    # --- Configuration ---
    # Load SECRET_KEY AFTER load_dotenv() has potentially loaded it
    secret_key = os.environ.get('SECRET_KEY')
    if not secret_key:
        print(f"SECRET_KEY not found in environment variables after attempting to load from {dotenv_path}")
        raise ValueError("No SECRET_KEY set for Flask application. Create a .env file in the project root and set SECRET_KEY='your_secret_key'.")

    app.config.from_mapping(
        SECRET_KEY=secret_key,
        # You can add other default configs here if needed
        # Example: SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(app.instance_path, 'app.db')
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        # config.py is loaded from the instance folder (PROJECT_ROOT/instance/config.py)
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.update(test_config)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
        # print(f"Created instance folder: {app.instance_path}") # Optional debug print
    except OSError:
        # Folder already exists
        pass

    # --- Initialize Extensions with the App ---
    print("Initializing extensions...")
    csrf.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app) # Initialize bcrypt here
    print("Extensions initialized.")

    # --- User Loader for Flask-Login ---
    @login_manager.user_loader
    def load_user(user_id):
        # Inline import to avoid circular dependency issues if crud imports from web_app
        from inventory import crud
        try:
            # User IDs stored in session are strings, convert back to int
            return crud.get_user_by_id(int(user_id))
        except ValueError:
            return None

    # --- Register Blueprints ---
    print("Registering blueprints...")
    # Inline imports to avoid circular dependencies
    from . import routes # Main app routes
    app.register_blueprint(routes.bp)

    from . import auth # Authentication routes
    app.register_blueprint(auth.bp)
    print("Blueprints registered.")

    # === Inject context ===  <- ADDED THIS SECTION
    @app.context_processor
    def inject_current_datetime():
        """Makes the current UTC datetime object available to all templates."""
        return {'now': datetime.datetime.utcnow()} # Use utcnow() for timezone consistency

    # --- Custom Error Handlers ---
    @app.errorhandler(404)
    def page_not_found(e):
        # Note: Pass the error 'e' to the template if you want to display debug info
        return render_template('404.html'), 404

    # Add other error handlers (e.g., 403, 500) here if desired
    # @app.errorhandler(500)
    # def internal_server_error(e):
    #     return render_template('500.html'), 500


    print("Flask app created successfully.")
    return app