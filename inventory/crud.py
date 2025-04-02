# inventory/crud.py
import sqlite3
from typing import List, Optional, Dict, Any
from datetime import date
from flask import current_app # Use Flask's app context for bcrypt instance
from .database import get_db_connection, close_db_connection, DEFAULT_DATABASE_PATH
from .models import HardwareAsset, AssociatedInfo, User

# --- Helper ---
def _dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def _get_conn_cursor(db_path=DEFAULT_DATABASE_PATH):
    conn = get_db_connection(db_path)
    conn.execute("PRAGMA foreign_keys = ON;")
    # Use sqlite3.Row by default from get_db_connection
    return conn, conn.cursor()

# === User CRUD ===

def create_user(username: str, password: str, db_path=DEFAULT_DATABASE_PATH) -> Optional[User]:
    """Creates a new user with a hashed password."""
    # Ensure bcrypt instance is available from Flask app context
    if not current_app:
        print("Error: Cannot hash password outside Flask application context.")
        return None
    bcrypt = current_app.extensions['bcrypt']
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    conn, cursor = _get_conn_cursor(db_path)
    try:
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username, password_hash)
        )
        conn.commit()
        user_id = cursor.lastrowid
        # Fetch the created user to return the full object
        return get_user_by_id(user_id, db_path)
    except sqlite3.IntegrityError:
        print(f"Error: Username '{username}' already exists.")
        return None
    except sqlite3.Error as e:
        print(f"Database error creating user: {e}")
        return None
    finally:
        close_db_connection(conn)

def get_user_by_id(user_id: int, db_path=DEFAULT_DATABASE_PATH) -> Optional[User]:
    """Retrieves a user by their ID."""
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    close_db_connection(conn)
    return User(**dict(row)) if row else None

def get_user_by_username(username: str, db_path=DEFAULT_DATABASE_PATH) -> Optional[User]:
    """Retrieves a user by their username."""
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    row = cursor.fetchone()
    close_db_connection(conn)
    return User(**dict(row)) if row else None

# === Hardware Asset CRUD (Mostly Unchanged, Ensure Correct Model Field Names) ===

def add_hardware_asset(asset: HardwareAsset, db_path=DEFAULT_DATABASE_PATH) -> int | None:
    conn, cursor = _get_conn_cursor(db_path)
    try:
        cursor.execute(
            '''INSERT INTO hardware_assets
               (name, category, sub_category, status, model, serial_number,
                purchase_date, acquisition_type, assigned_user, location, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            (asset.name, asset.category, asset.sub_category, asset.status, asset.model,
             asset.serial_number, asset.purchase_date, asset.acquisition_type,
             asset.assigned_user, asset.location, asset.notes)
        )
        conn.commit()
        asset_id = cursor.lastrowid
        return asset_id
    except sqlite3.IntegrityError as e:
        print(f"Error adding hardware: {e}. Check unique constraints (name, serial_number).")
        return None
    except sqlite3.Error as e:
        print(f"Database error adding hardware: {e}")
        return None
    finally:
        close_db_connection(conn)

# ... (get_hardware_asset_by_id, get_hardware_asset_by_name, get_all_hardware_assets are unchanged) ...
def get_hardware_asset_by_id(asset_id: int, db_path=DEFAULT_DATABASE_PATH) -> Optional[HardwareAsset]:
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute("SELECT * FROM hardware_assets WHERE id = ?", (asset_id,))
    row = cursor.fetchone()
    close_db_connection(conn)
    return HardwareAsset(**dict(row)) if row else None

def get_hardware_asset_by_name(name: str, db_path=DEFAULT_DATABASE_PATH) -> Optional[HardwareAsset]:
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute("SELECT * FROM hardware_assets WHERE name = ?", (name,))
    row = cursor.fetchone()
    close_db_connection(conn)
    return HardwareAsset(**dict(row)) if row else None

def get_all_hardware_assets(db_path=DEFAULT_DATABASE_PATH) -> List[HardwareAsset]:
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute("SELECT * FROM hardware_assets ORDER BY name")
    rows = cursor.fetchall()
    close_db_connection(conn)
    return [HardwareAsset(**dict(row)) for row in rows]


def update_hardware_asset(asset_id: int, updates: Dict[str, Any], db_path=DEFAULT_DATABASE_PATH) -> bool:
    conn, cursor = _get_conn_cursor(db_path)
    fields = []
    values = []
    # Use model's fields for validation
    valid_keys = [f.name for f in HardwareAsset.__dataclass_fields__.values() if f.name not in ['id', 'created_at', 'updated_at']]

    for key, value in updates.items():
        if key in valid_keys:
            fields.append(f"{key} = ?")
            if isinstance(value, date): # Ensure dates are formatted correctly for SQL
                values.append(value.isoformat() if value else None)
            elif value == '': # Treat empty strings as NULL for optional fields
                 values.append(None)
            else:
                 values.append(value)
        # else: # Optionally warn about invalid keys
        #     print(f"Warning: Invalid field '{key}' ignored during hardware update.")


    if not fields:
        print("No valid fields to update.")
        return False

    values.append(asset_id)
    sql = f"UPDATE hardware_assets SET {', '.join(fields)} WHERE id = ?"

    try:
        cursor.execute(sql, tuple(values))
        conn.commit()
        success = cursor.rowcount > 0
        if not success:
            print(f"Warning: Hardware asset with ID {asset_id} not found for update.")
        return success
    except sqlite3.IntegrityError as e:
        print(f"Error updating hardware asset {asset_id}: {e}. Check unique constraints.")
        conn.rollback() # Rollback on error
        return False
    except sqlite3.Error as e:
        print(f"Database error updating hardware asset {asset_id}: {e}")
        conn.rollback() # Rollback on error
        return False
    finally:
        close_db_connection(conn)


def delete_hardware_asset(asset_id: int, db_path=DEFAULT_DATABASE_PATH) -> bool:
    conn, cursor = _get_conn_cursor(db_path)
    try:
        cursor.execute("DELETE FROM hardware_assets WHERE id = ?", (asset_id,))
        conn.commit()
        success = cursor.rowcount > 0
        if not success:
             print(f"Warning: Hardware asset with ID {asset_id} not found for deletion.")
        return success
    except sqlite3.Error as e:
        print(f"Error deleting hardware asset {asset_id}: {e}")
        conn.rollback()
        return False
    finally:
        close_db_connection(conn)

def search_hardware_assets(criteria: Dict[str, Any], db_path=DEFAULT_DATABASE_PATH) -> List[HardwareAsset]:
    conn, cursor = _get_conn_cursor(db_path)
    where_clauses = []
    params = []
    searchable_fields = { # Updated field names
        'name': 'LIKE', 'category': '=', 'sub_category': 'LIKE', 'status': '=',
        'model': 'LIKE', 'serial_number': 'LIKE', 'assigned_user': 'LIKE',
        'location': 'LIKE', 'acquisition_type': '=',
    }

    for key, value in criteria.items():
        if value and key in searchable_fields: # Ensure value is not empty/None
            operator = searchable_fields[key]
            if operator == 'LIKE':
                where_clauses.append(f"LOWER({key}) LIKE LOWER(?)") # Case-insensitive search
                params.append(f"%{value}%")
            else: # Exact match =
                where_clauses.append(f"LOWER({key}) = LOWER(?)") # Case-insensitive exact match
                params.append(value)

    if not where_clauses:
        return get_all_hardware_assets(db_path)

    sql = f"SELECT * FROM hardware_assets WHERE {' AND '.join(where_clauses)} ORDER BY name"

    try:
        cursor.execute(sql, tuple(params))
        rows = cursor.fetchall()
        return [HardwareAsset(**dict(row)) for row in rows]
    except sqlite3.Error as e:
        print(f"Error searching hardware: {e}")
        return []
    finally:
        close_db_connection(conn)


# === Associated Info CRUD (Updates similar to Hardware) ===

def add_associated_info(info: AssociatedInfo, db_path=DEFAULT_DATABASE_PATH) -> int | None:
    if not get_hardware_asset_by_id(info.hardware_asset_id, db_path):
         print(f"Error: Hardware asset with ID {info.hardware_asset_id} does not exist.")
         return None

    conn, cursor = _get_conn_cursor(db_path)
    try:
        cursor.execute(
            '''INSERT INTO associated_info
               (hardware_asset_id, info_type, name, details, license_key,
                activation_date, expiry_date, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
            (info.hardware_asset_id, info.info_type, info.name, info.details,
             info.license_key, info.activation_date, info.expiry_date, info.notes)
        )
        conn.commit()
        info_id = cursor.lastrowid
        return info_id
    except sqlite3.Error as e:
        print(f"Database error adding associated info: {e}")
        conn.rollback()
        return None
    finally:
        close_db_connection(conn)

# ... (get_info_for_hardware, get_associated_info_by_id are unchanged) ...
def get_info_for_hardware(hardware_asset_id: int, db_path=DEFAULT_DATABASE_PATH) -> List[AssociatedInfo]:
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute(
        "SELECT * FROM associated_info WHERE hardware_asset_id = ? ORDER BY info_type, name",
        (hardware_asset_id,)
    )
    rows = cursor.fetchall()
    close_db_connection(conn)
    return [AssociatedInfo(**dict(row)) for row in rows]

def get_associated_info_by_id(info_id: int, db_path=DEFAULT_DATABASE_PATH) -> Optional[AssociatedInfo]:
    conn, cursor = _get_conn_cursor(db_path)
    cursor.execute("SELECT * FROM associated_info WHERE id = ?", (info_id,))
    row = cursor.fetchone()
    close_db_connection(conn)
    return AssociatedInfo(**dict(row)) if row else None

def update_associated_info(info_id: int, updates: Dict[str, Any], db_path=DEFAULT_DATABASE_PATH) -> bool:
    conn, cursor = _get_conn_cursor(db_path)
    fields = []
    values = []
    valid_keys = [f.name for f in AssociatedInfo.__dataclass_fields__.values() if f.name not in ['id', 'created_at', 'updated_at']]

    for key, value in updates.items():
        if key in valid_keys:
            fields.append(f"{key} = ?")
            if isinstance(value, date):
                 values.append(value.isoformat() if value else None)
            elif value == '': # Treat empty strings as NULL for optional fields
                 values.append(None)
            else:
                 values.append(value)
        # else: # Optionally warn about invalid keys
        #     print(f"Warning: Invalid field '{key}' ignored during info update.")

    if not fields:
        print("No valid fields to update for associated info.")
        return False

    values.append(info_id)
    sql = f"UPDATE associated_info SET {', '.join(fields)} WHERE id = ?"

    try:
        # Explicitly check if hardware_asset_id is being updated and exists
        if 'hardware_asset_id' in updates:
            target_hw_id = updates['hardware_asset_id']
            if target_hw_id is not None and not get_hardware_asset_by_id(target_hw_id, db_path):
                print(f"Error: Target hardware asset ID {target_hw_id} does not exist.")
                return False

        cursor.execute(sql, tuple(values))
        conn.commit()
        success = cursor.rowcount > 0
        if not success:
            print(f"Warning: Associated info with ID {info_id} not found for update.")
        return success
    except sqlite3.IntegrityError as e:
        print(f"Error updating associated info {info_id}: {e}.")
        conn.rollback()
        return False
    except sqlite3.Error as e:
        print(f"Database error updating associated info {info_id}: {e}")
        conn.rollback()
        return False
    finally:
        close_db_connection(conn)


def delete_associated_info(info_id: int, db_path=DEFAULT_DATABASE_PATH) -> bool:
    conn, cursor = _get_conn_cursor(db_path)
    try:
        cursor.execute("DELETE FROM associated_info WHERE id = ?", (info_id,))
        conn.commit()
        success = cursor.rowcount > 0
        if not success:
            print(f"Warning: Associated info with ID {info_id} not found for deletion.")
        return success
    except sqlite3.Error as e:
        print(f"Error deleting associated info {info_id}: {e}")
        conn.rollback()
        return False
    finally:
        close_db_connection(conn)