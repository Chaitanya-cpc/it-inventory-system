# inventory/reporting.py
import sqlite3 # <--- ADD THIS LINE
from datetime import date, timedelta
from typing import List, Dict, Any
from . import crud, models
from .database import DEFAULT_DATABASE_PATH, get_db_connection, close_db_connection # Import helpers if used directly

def get_assets_by_status(status: str, db_path=DEFAULT_DATABASE_PATH) -> List[models.HardwareAsset]:
    """Finds hardware assets with a specific status."""
    # This function relies solely on crud.search_hardware_assets,
    # so it doesn't directly need sqlite3 itself.
    criteria = {'status': status}
    return crud.search_hardware_assets(criteria, db_path)

def get_info_expiring_soon(days: int = 30, db_path=DEFAULT_DATABASE_PATH) -> List[models.AssociatedInfo]:
    """Finds licenses/warranties expiring within a given number of days."""
    # Use the direct connection helpers here for consistency, or keep using crud._get_conn_cursor
    # conn, cursor = crud._get_conn_cursor(db_path) # Option 1: Keep using crud's helper
    conn = get_db_connection(db_path)             # Option 2: Use direct import
    cursor = conn.cursor()

    cutoff_date = (date.today() + timedelta(days=days)).isoformat()
    today_str = date.today().isoformat()

    # Select info where expiry_date is not null, is after today, and before the cutoff date
    sql = """
        SELECT ai.*, hw.name as hardware_name
        FROM associated_info ai
        JOIN hardware_assets hw ON ai.hardware_asset_id = hw.id
        WHERE ai.expiry_date IS NOT NULL
          AND ai.expiry_date >= ?
          AND ai.expiry_date <= ?
        ORDER BY ai.expiry_date
    """
    results = []
    try:
        cursor.execute(sql, (today_str, cutoff_date))
        rows = cursor.fetchall()
        # Convert rows to AssociatedInfo objects, augmented with hardware name
        for row_dict in [dict(row) for row in rows]:
             hw_name = row_dict.pop('hardware_name') # Remove extra field before creating model
             info = models.AssociatedInfo(**row_dict)
             # Add hardware name as temporary attribute for reporting context
             setattr(info, 'hardware_name', hw_name) # Use setattr for adding temporary attribute
             results.append(info)
    except sqlite3.Error as e: # <--- This now works because sqlite3 is imported
        print(f"Error fetching expiring info: {e}")
        # Return empty list on error, or re-raise? For reporting, often best to just report failure.
    finally:
        close_db_connection(conn) # Use direct import

    return results

# Add more reporting functions as needed:
# - Assets purchased within a date range
# - Assets assigned to a specific user
# - Count of assets by category/status