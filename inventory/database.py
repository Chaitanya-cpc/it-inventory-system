# inventory/database.py
import sqlite3
import os

# Determine the absolute path for the database file
# Place it in a 'data' subdirectory next to the 'inventory' package
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
DATABASE_PATH = os.path.join(DATA_DIR, 'inventory.db')

# Ensure the data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

def get_db_connection():
    """Establishes a connection to the SQLite database."""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row # Return rows as dictionary-like objects
    return conn

def close_db_connection(conn):
    """Closes the database connection."""
    if conn:
        conn.close()

def initialize_database():
    """Creates the database tables if they don't exist."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Hardware Assets Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hardware_assets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL CHECK(category IN (
                'Laptop', 'Desktop', 'Mouse', 'Keyboard', 'Server', 'Printer',
                'Wifi', 'Phone', 'Storage Drive', 'Monitor', 'UPS', 'Other'
            )),
            status TEXT NOT NULL CHECK(status IN ('New', 'Okay', 'Needs Repair', 'Dead')),
            model TEXT,
            serial_number TEXT UNIQUE, -- Serial numbers should ideally be unique
            purchase_date DATE,
            acquisition_type TEXT CHECK(acquisition_type IN ('Purchased', 'Rented', 'Leased', 'Other')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    # Add an index for faster lookups by serial number (optional but good practice)
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_serial_number ON hardware_assets (serial_number)
    ''')

    # Software / Associated Info Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS software_licenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hardware_asset_id INTEGER NOT NULL, -- Foreign key link
            name TEXT NOT NULL, -- e.g., "MS Office Pro 2021", "Sophos Endpoint", "Warranty Info", "Network Config"
            license_type TEXT NOT NULL CHECK(license_type IN (
                'Office Suite', 'Firewall', 'Antivirus', 'OS', 'Network Info',
                'Warranty', 'Activation', 'Other License'
            )),
            license_key TEXT, -- Can be null if not applicable (e.g., for Warranty/Network)
            ip_address TEXT,
            mac_address TEXT,
            imei TEXT,
            dns_servers TEXT,
            activation_date DATE,
            expiry_date DATE, -- For licenses or warranties
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (hardware_asset_id) REFERENCES hardware_assets (id)
                ON DELETE CASCADE -- If hardware is deleted, associated software/info is also deleted
        )
    ''')
    # Add an index for faster lookups by hardware ID
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_hardware_asset_id ON software_licenses (hardware_asset_id)
    ''')

    # Trigger to update 'updated_at' timestamp on hardware update
    cursor.execute('''
        CREATE TRIGGER IF NOT EXISTS update_hardware_assets_updated_at
        AFTER UPDATE ON hardware_assets
        FOR EACH ROW
        BEGIN
            UPDATE hardware_assets SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;
    ''')

    # Trigger to update 'updated_at' timestamp on software update
    cursor.execute('''
        CREATE TRIGGER IF NOT EXISTS update_software_licenses_updated_at
        AFTER UPDATE ON software_licenses
        FOR EACH ROW
        BEGIN
            UPDATE software_licenses SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;
    ''')


    conn.commit()
    close_db_connection(conn)
    print(f"Database initialized successfully at {DATABASE_PATH}")

if __name__ == '__main__':
    # Allow running this script directly to initialize the DB
    print("Initializing database schema...")
    initialize_database()