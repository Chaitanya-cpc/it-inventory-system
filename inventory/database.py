# inventory/database.py
import sqlite3
import os

# Determine the absolute path for the database file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
DEFAULT_DATABASE_PATH = os.path.join(DATA_DIR, 'inventory.db')

# Ensure the data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

def get_db_connection(db_path=DEFAULT_DATABASE_PATH): # Added db_path parameter
    """Establishes a connection to the SQLite database."""
    is_new_db = not os.path.exists(db_path)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row # Return rows as dictionary-like objects
    # Enable foreign key constraints for this connection
    conn.execute("PRAGMA foreign_keys = ON;")
    # If it's a brand new DB for tests, maybe initialize schema? (or handle in test setup)
    # if is_new_db: # Optional: auto-initialize if connection creates the file
    #     print(f"Initializing schema for new database: {db_path}")
    #     initialize_database(conn) # Pass connection to avoid reconnecting
    return conn

def close_db_connection(conn):
    """Closes the database connection."""
    if conn:
        conn.close()

# Pass connection optionaly to allow initialization on existing connection
def initialize_database(conn=None, db_path=DEFAULT_DATABASE_PATH):
    """Creates the database tables if they don't exist."""
    needs_close = False
    if conn is None:
        conn = get_db_connection(db_path)
        needs_close = True

    cursor = conn.cursor()

    # --- Hardware Assets Table ---
    # Added NOT NULL constraints where appropriate, added sub_category
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hardware_assets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE, -- Often names/asset tags are unique identifiers
            category TEXT NOT NULL CHECK(category IN (
                'Laptop', 'Desktop', 'Mouse', 'Keyboard', 'Server', 'Printer',
                'Wifi', 'Phone', 'Storage Drive', 'Monitor', 'UPS', 'Other'
            )),
            sub_category TEXT, -- E.g., 'Engineering', 'AIO', 'Plotter', 'Router'
            status TEXT NOT NULL CHECK(status IN ('New', 'Okay', 'Needs Repair', 'Dead', 'Deployed', 'Stored')),
            model TEXT,
            serial_number TEXT UNIQUE,
            purchase_date DATE,
            acquisition_type TEXT CHECK(acquisition_type IN ('Purchased', 'Rented', 'Leased', 'Subscription', 'Other')),
            assigned_user TEXT, -- New field: Who is using it?
            location TEXT, -- New field: Where is it?
            notes TEXT, -- New field: General notes
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_hw_name ON hardware_assets (name)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_hw_serial ON hardware_assets (serial_number)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_hw_status ON hardware_assets (status)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_hw_category ON hardware_assets (category)')

    # --- Software / Associated Info Table ---
    # Renamed some fields for clarity, added notes
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS associated_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hardware_asset_id INTEGER NOT NULL,
            info_type TEXT NOT NULL CHECK(info_type IN (
                'Office Suite', 'Firewall', 'Antivirus', 'OS', 'Network',
                'Warranty', 'Subscription', 'Other License', 'Configuration', 'Note'
            )),
            name TEXT NOT NULL, -- e.g., "MS Office Pro 2021", "Firewall Rule", "Network Config", "Warranty Details"
            details TEXT, -- General purpose field for various info (IP, MAC, DNS, User, etc.)
            license_key TEXT,
            activation_date DATE,
            expiry_date DATE,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (hardware_asset_id) REFERENCES hardware_assets (id)
                ON DELETE CASCADE
        )
    ''')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_assoc_hardware_id ON associated_info (hardware_asset_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_assoc_info_type ON associated_info (info_type)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_assoc_expiry ON associated_info (expiry_date)')


    # --- Triggers --- (Keep existing triggers for updated_at)
    cursor.execute('''
        CREATE TRIGGER IF NOT EXISTS update_hardware_assets_updated_at
        AFTER UPDATE ON hardware_assets
        FOR EACH ROW WHEN NEW.updated_at = OLD.updated_at -- Avoid recursion
        BEGIN
            UPDATE hardware_assets SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;
    ''')
    cursor.execute('''
        CREATE TRIGGER IF NOT EXISTS update_associated_info_updated_at
        AFTER UPDATE ON associated_info
        FOR EACH ROW WHEN NEW.updated_at = OLD.updated_at -- Avoid recursion
        BEGIN
            UPDATE associated_info SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;
    ''')

    conn.commit()
    if needs_close:
        close_db_connection(conn)
        print(f"Database initialized/verified successfully at {db_path}")

if __name__ == '__main__':
    print("Initializing database schema...")
    initialize_database()