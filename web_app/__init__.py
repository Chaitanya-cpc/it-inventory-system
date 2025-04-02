# web_app/__init__.py
import os
from flask import Flask
from dotenv import load_dotenv

# Load environment variables from .env file (optional)
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))


def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)

    # --- Configuration ---
    # Default configuration
    app.config.from_mapping(
        # IMPORTANT: Change this to a random secret key in production!
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
        # You might store DB path here too if needed elsewhere
        # DATABASE=database.DEFAULT_DATABASE_PATH,
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.update(test_config)

    # Ensure the instance folder exists (if needed for config.py)
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # --- Database Initialization (Optional: ensure DB exists on startup) ---
    # You might call initialize_database here if you want to ensure
    # tables exist when the app starts, but the init-db command is fine too.
    # with app.app_context():
    #     from inventory import database
    #     database.initialize_database() # Be careful doing this on every start in production

    # --- Register Blueprints (Routes) ---
    from . import routes
    app.register_blueprint(routes.bp)

    # Make crud functions easily accessible within templates or routes if needed
    # (or import them directly in routes.py)
    # @app.context_processor
    # def inject_crud():
    #     from inventory import crud
    #     return dict(crud=crud)

    print("Flask app created.") # Debug message
    return app