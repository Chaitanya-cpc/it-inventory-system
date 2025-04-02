# inventory/crud.py
from .database import get_db_connection, close_db_connection
from .models import HardwareAsset, SoftwareLicense
from datetime import date
from typing import List, Optional

# --- Hardware Asset CRUD ---

def add_hardware_asset(asset: HardwareAsset) -> int:
    """Adds a new hardware asset to the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            '''INSERT INTO hardware_assets
               (name, category, status, model, serial_number, purchase_date, acquisition_type)
               VALUES (?, ?, ?, ?, ?, ?, ?)''',
            (asset.name, asset.category, asset.status, asset.model,
             asset.serial_number, asset.purchase_date, asset.acquisition_type)
        )
        conn.commit()
        asset_id = cursor.lastrowid
        return asset_id
    except sqlite3.IntegrityError as e:
        print(f"Error adding hardware: {e}") # e.g., Serial number already exists
        return -1 # Indicate failure
    finally:
        close_db_connection(conn)


def get_hardware_asset_by_id(asset_id: int) -> Optional[HardwareAsset]:
    """Retrieves a hardware asset by its ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM hardware_assets WHERE id = ?", (asset_id,))
    row = cursor.fetchone()
    close_db_connection(conn)
    if row:
        return HardwareAsset(**dict(row)) # Convert row object to dictionary then to dataclass
    return None

def get_all_hardware_assets() -> List[HardwareAsset]:
    """Retrieves all hardware assets from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM hardware_assets ORDER BY name")
    rows = cursor.fetchall()
    close_db_connection(conn)
    return [HardwareAsset(**dict(row)) for row in rows]

def update_hardware_asset(asset_id: int, updates: dict):
    """Updates specific fields of a hardware asset."""
    if not updates:
        print("No updates provided.")
        return False

    fields = []
    values = []
    for key, value in updates.items():
        # Basic validation - ensure key is a valid column name (improve this for security)
        if key in ['name', 'category', 'status', 'model', 'serial_number', 'purchase_date', 'acquisition_type']:
             # Convert date objects to strings if they are dates
            if isinstance(value, date):
                value = value.isoformat()
            fields.append(f"{key} = ?")
            values.append(value)
        else:
            print(f"Warning: Invalid field '{key}' ignored during update.")


    if not fields:
        print("No valid fields to update.")
        return False

    values.append(asset_id) # Add asset_id for the WHERE clause
    sql = f"UPDATE hardware_assets SET {', '.join(fields)} WHERE id = ?"

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(sql, tuple(values))
        conn.commit()
        return cursor.rowcount > 0 # Return True if update affected rows
    except sqlite3.Error as e:
        print(f"Error updating hardware asset {asset_id}: {e}")
        return False
    finally:
        close_db_connection(conn)


def delete_hardware_asset(asset_id: int) -> bool:
    """Deletes a hardware asset by its ID. (Cascades to software_licenses)"""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Ensure foreign keys are enabled if not enabled by default
        cursor.execute("PRAGMA foreign_keys = ON;")
        cursor.execute("DELETE FROM hardware_assets WHERE id = ?", (asset_id,))
        conn.commit()
        return cursor.rowcount > 0 # True if a row was deleted
    except sqlite3.Error as e:
        print(f"Error deleting hardware asset {asset_id}: {e}")
        return False
    finally:
        close_db_connection(conn)


# --- Software/License CRUD ---

def add_software_license(license_info: SoftwareLicense) -> int:
    """Adds new software/license information linked to hardware."""
    # Check if hardware exists first
    if not get_hardware_asset_by_id(license_info.hardware_asset_id):
         print(f"Error: Hardware asset with ID {license_info.hardware_asset_id} does not exist.")
         return -1

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            '''INSERT INTO software_licenses
               (hardware_asset_id, name, license_type, license_key, ip_address,
                mac_address, imei, dns_servers, activation_date, expiry_date)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            (license_info.hardware_asset_id, license_info.name, license_info.license_type,
             license_info.license_key, license_info.ip_address, license_info.mac_address,
             license_info.imei, license_info.dns_servers, license_info.activation_date,
             license_info.expiry_date)
        )
        conn.commit()
        license_id = cursor.lastrowid
        return license_id
    except sqlite3.Error as e:
        print(f"Error adding software/license: {e}")
        return -1
    finally:
        close_db_connection(conn)

def get_software_for_hardware(hardware_asset_id: int) -> List[SoftwareLicense]:
    """Retrieves all software/licenses linked to a specific hardware asset."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM software_licenses WHERE hardware_asset_id = ? ORDER BY name",
        (hardware_asset_id,)
    )
    rows = cursor.fetchall()
    close_db_connection(conn)
    return [SoftwareLicense(**dict(row)) for row in rows]

def get_all_software_licenses() -> List[SoftwareLicense]:
    """Retrieves all software/licenses from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM software_licenses ORDER BY hardware_asset_id, name")
    rows = cursor.fetchall()
    close_db_connection(conn)
    return [SoftwareLicense(**dict(row)) for row in rows]

def update_software_license(license_id: int, updates: dict):
    """Updates specific fields of a software/license record."""
    # Similar logic to update_hardware_asset, adapt fields and table name
    if not updates:
        print("No updates provided.")
        return False

    fields = []
    values = []
    valid_keys = ['name', 'license_type', 'license_key', 'ip_address', 'mac_address',
                  'imei', 'dns_servers', 'activation_date', 'expiry_date', 'hardware_asset_id']

    for key, value in updates.items():
        if key in valid_keys:
            if isinstance(value, date):
                value = value.isoformat()
            fields.append(f"{key} = ?")
            values.append(value)
        else:
             print(f"Warning: Invalid field '{key}' ignored during update.")

    if not fields:
        print("No valid fields to update.")
        return False

    values.append(license_id) # For WHERE clause
    sql = f"UPDATE software_licenses SET {', '.join(fields)} WHERE id = ?"

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(sql, tuple(values))
        conn.commit()
        return cursor.rowcount > 0
    except sqlite3.Error as e:
        print(f"Error updating software/license {license_id}: {e}")
        return False
    finally:
        close_db_connection(conn)

def delete_software_license(license_id: int) -> bool:
    """Deletes a software/license record by its ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM software_licenses WHERE id = ?", (license_id,))
        conn.commit()
        return cursor.rowcount > 0
    except sqlite3.Error as e:
        print(f"Error deleting software/license {license_id}: {e}")
        return False
    finally:
        close_db_connection(conn)