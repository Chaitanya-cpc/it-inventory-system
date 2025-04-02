# Company IT Inventory Management System

This system manages hardware assets and associated information (licenses, network config, warranties, notes) for the company using a command-line interface (CLI) and an SQLite database.

## Features

- Track hardware assets (Laptops, Desktops, Servers, etc.) with details like status, user, location.
- Track associated information linked to hardware (Licenses, Warranties, Network details, Notes).
- Command-line interface (powered by Click) for managing inventory.
- Search functionality for hardware assets.
- Basic reporting (e.g., assets by status, expiring items).
- Data stored in a local SQLite database (`data/inventory.db`).
- Basic test suite using `pytest`.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd inventory-management
    ```
2.  **(Recommended) Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Initialize the database:** (Creates `data/inventory.db` if it doesn't exist)
    ```bash
    python main.py init-db
    ```

## Usage (CLI Commands)

The main entry point is `python main.py`. Use `--help` to see available commands and options.

```bash
python main.py --help
python main.py hardware --help
python main.py info --help
python main.py report --help
```
