# Company IT Inventory Management System

This system manages hardware assets and associated software licenses/information for the company.

## Features

- Track hardware assets (Laptops, Desktops, Servers, etc.)
- Track software licenses, warranties, and network details associated with hardware.
- Command-line interface for managing inventory.
- Data stored in an SQLite database.

## Setup

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd inventory-management
    ```
2.  (Recommended) Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  Install dependencies (if any listed in `requirements.txt` later):
    ```bash
    pip install -r requirements.txt
    ```
4.  Initialize the database (the script will create `inventory.db` if it doesn't exist):
    ```bash
    python main.py init-db
    ```

## Usage

```bash
# Add a new hardware asset
python main.py add hardware --name "ENG-LAP-001" --category "Laptop" --status "New" --model "Dell XPS 15" --serial "ABC123XYZ" --purchase_date "2023-10-26" --acquisition "Purchased"

# List all hardware assets
python main.py list hardware

# Add software/license info linked to hardware (use hardware ID from list)
python main.py add software --hardware_id 1 --name "Windows 11 Pro" --type "OS" --key "XXXXX-XXXXX-..." --activation_date "2023-10-27"

# List software for a specific hardware ID
python main.py list software --hardware_id 1

# ... (Add more usage examples as you build features)
```
