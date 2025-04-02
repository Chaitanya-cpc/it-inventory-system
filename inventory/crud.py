# inventory/crud.py
import sqlite3
from typing import List, Optional, Dict, Any
from .database import get_db_connection, close_db_connection, DEFAULT_DATABASE_PATH
from .models import HardwareAsset, AssociatedInfo
from datetime import date

# --- Helper ---
def _dict_factory(cursor, row):
    """Converts tuple rows to dictionaries."""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def _get_conn_cursor(db_path=DEFAULT_DATABASE_PATH):
    conn = get_db_connection(db_path)
    # Redundant but safe: ensure foreign keys are on for this connection
    conn.execute("PRAGMA foreign_keys = ON;")
    # Use the standard dictionary row factory if preferred over sqlite3.Row
    # conn.row_factory = _dict_factory
    return conn, conn.cursor()

# --- Hardware Asset CRUD ---

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
    valid_keys = [f.name for f in HardwareAsset.__dataclass_fields__.values() if f.name not in ['id', 'created_at', 'updated_at']]

    for key, value in updates.items():
        if key in valid_keys:
            fields.append(f"{key} = ?")
             # Convert date objects to strings if they are dates for SQL
            if isinstance(value, date):
                values.append(value.isoformat())
            else:
                values.append(value)
        else:
            print(f"Warning: Invalid field '{key}' ignored during hardware update.")

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
        return False
    except sqlite3.Error as e:
        print(f"Database error updating hardware asset {asset_id}: {e}")
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
        return False
    finally:
        close_db_connection(conn)

def search_hardware_assets(criteria: Dict[str, Any], db_path=DEFAULT_DATABASE_PATH) -> List[HardwareAsset]:
    """Searches hardware assets based on flexible criteria."""
    conn, cursor = _get_conn_cursor(db_path)
    where_clauses = []
    params = []
    # Define searchable fields and how to search them (exact match, LIKE, etc.)
    searchable_fields = {
        'name': 'LIKE', 'category': '=', 'sub_category': '=', 'status': '=',
        'model': 'LIKE', 'serial_number': 'LIKE', 'assigned_user': 'LIKE',
        'location': 'LIKE', 'acquisition_type': '=',
        # Add more fields as needed
    }

    for key, value in criteria.items():
        if value is not None and key in searchable_fields:
            operator = searchable_fields[key]
            if operator == 'LIKE':
                where_clauses.append(f"{key} LIKE ?")
                params.append(f"%{value}%") # Wildcard search
            else: # Exact match =
                where_clauses.append(f"{key} = ?")
                params.append(value)

    if not where_clauses:
        return get_all_hardware_assets(db_path) # Return all if no criteria

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


# --- Associated Info CRUD --- (Similar updates: add db_path, improve error handling)

def add_associated_info(info: AssociatedInfo, db_path=DEFAULT_DATABASE_PATH) -> int | None:
    # Check if hardware exists first
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
        return None
    finally:
        close_db_connection(conn)


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
                values.append(value.isoformat())
            else:
                values.append(value)
        else:
            print(f"Warning: Invalid field '{key}' ignored during info update.")

    if not fields:
        print("No valid fields to update for associated info.")
        return False

    values.append(info_id)
    sql = f"UPDATE associated_info SET {', '.join(fields)} WHERE id = ?"

    try:
        cursor.execute(sql, tuple(values))
        conn.commit()
        success = cursor.rowcount > 0
        if not success:
            print(f"Warning: Associated info with ID {info_id} not found for update.")
        return success
    except sqlite3.IntegrityError as e: # e.g. moving to non-existent hardware_id if foreign key is checked strictly
        print(f"Error updating associated info {info_id}: {e}.")
        return False
    except sqlite3.Error as e:
        print(f"Database error updating associated info {info_id}: {e}")
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
        return False
    finally:
        close_db_connection(conn)

# Add search for associated info if needed (similar to hardware search)