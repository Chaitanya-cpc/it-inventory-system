# Company IT Inventory Web Application

This web application manages hardware assets and associated information (licenses, network config, warranties, notes) for the company using a Flask web interface and an SQLite database. It requires users to log in.

## Features

- **Web Interface:** Manage inventory through a browser.
- **Authentication:** Secure user login system (passwords are hashed).
- **Hardware Tracking:** Add, view, edit, delete hardware assets (Laptops, Desktops, Servers, etc.) with details like status, assigned user, location, purchase date, etc.
- **Associated Info Tracking:** Add, view, edit, delete related information linked to hardware (Licenses, Warranties, Network details, Configuration, Notes).
- **Search:** Basic search for hardware by name or serial number.
- **Reporting:**
  - View assets based on their status (New, Deployed, Needs Repair, etc.).
  - View items (licenses, warranties) expiring within a configurable number of days (default 30).
- **Database:** Data stored in a local SQLite database (`data/inventory.db`).
- **Security:** Uses Flask-WTF for CSRF protection on forms and Flask-Bcrypt for password hashing.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd inventory-management
    ```
2.  **(Recommended) Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  **Create `.env` file:** Copy the example below into a new file named `.env` in the project root (`inventory-management/`).

    ```ini
    # .env
    # Generate a real secret key using: python -c 'import secrets; print(secrets.token_hex(24))'
    SECRET_KEY='replace_this_with_your_actual_strong_random_secret_key'
    FLASK_ENV=development
    # Optional: Set FLASK_DEBUG=true for auto-reloading during development
    # FLASK_DEBUG=true
    ```

    **Important:** Replace the placeholder `SECRET_KEY` with a real, strong, random key. **Add `.env` to your `.gitignore` file!**

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Initialize the database:** This creates the necessary tables (`users`, `hardware_assets`, `associated_info`).
    ```bash
    flask init-db
    # Or: python run.py init-db
    ```
6.  **Create an initial user:** You need at least one user to log in.
    ```bash
    flask create-user <your_desired_username>
    # Or: python run.py create-user <your_desired_username>
    ```
    You will be prompted securely to enter and confirm a password for this user.

## Running the Application

1.  **Activate your virtual environment** (if not already active):
    ```bash
    source venv/bin/activate
    ```
2.  **Run the Flask development server:**

    ```bash
    flask run --host=0.0.0.0
    # Or: python run.py
    ```

    Using `--host=0.0.0.0` makes the application accessible from other devices on your network (use your machine's local IP address). If you omit it, it will only be accessible from `http://127.0.0.1:5000`.

3.  **Access the application:** Open your web browser and navigate to `http://127.0.0.1:5000` (or the address shown in the terminal, typically including your machine's IP if using `0.0.0.0`).

4.  **Log in:** Use the username and password you created during setup.

## Usage

- Navigate using the top menu bar to view hardware, add hardware, or access reports.
- Click on a hardware item's name to view its details and associated information.
- Use the "Edit" and "Delete" buttons (with confirmation prompts for deletion) on list or view pages.
- Use the forms to add or update records. Required fields are marked.
- The search bar on the Hardware list page allows searching by Name or Serial Number.

## Running Tests

Tests (primarily for the original CRUD layer) are in the `tests/` directory.

1.  Ensure development dependencies are installed (pytest is included in `requirements.txt`).
2.  Run `pytest` from the project root directory (`inventory-management/`):
    ```bash
    pytest -v
    ```
    _(Note: Web application routes are not covered by the current `test_crud.py`. Additional tests using Flask's test client would be needed for full web app coverage)._

## Future Enhancements

- **Web Testing:** Add tests for Flask routes and form submissions using `pytest` and Flask's test client.
- **Advanced Search/Filtering:** Implement more sophisticated search options (date ranges, multiple status/category filters, etc.) on list pages.
- **User Roles/Permissions:** Introduce different user roles (e.g., Admin, User) with varying levels of access (e.g., only Admins can delete).
- **Bulk Actions:** Allow selecting multiple items for bulk updates or deletion.
- **Import/Export:** Add functionality to import from or export inventory data to CSV/Excel.
- **Dashboard:** Create a dashboard page summarizing key inventory metrics.
- **Deployment:** Configure for production deployment using a WSGI server (Gunicorn, Waitress) and potentially containerization (Docker).
- **Database Migrations:** Integrate Alembic or Flask-Migrate if schema changes become frequent.
