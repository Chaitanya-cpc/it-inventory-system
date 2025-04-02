# inventory/reporting.py
from datetime import date, timedelta
from typing import List, Dict, Any
from . import crud, models
from .database import DEFAULT_DATABASE_PATH

def get_assets_by_status(status: str, db_path=DEFAULT_DATABASE_PATH) -> List[models.HardwareAsset]:
    """Finds hardware assets with a specific status."""
    criteria = {'status': status}
    return crud.search_hardware_assets(criteria, db_path)

def get_info_expiring_soon(days: int = 30, db_path=DEFAULT_DATABASE_PATH) -> List[models.AssociatedInfo]:
    """Finds licenses/warranties expiring within a given number of days."""
    conn, cursor = crud._get_conn_cursor(db_path)
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
    try:
        cursor.execute(sql, (today_str, cutoff_date))
        rows = cursor.fetchall()
        # We need to return AssociatedInfo objects, potentially augmented with hardware name
        results = []
        for row_dict in [dict(row) for row in rows]:
             hw_name = row_dict.pop('hardware_name') # Remove extra field
             info = models.AssociatedInfo(**row_dict)
             # Add hardware name as temporary attribute for reporting context
             info.hardware_name = hw_name
             results.append(info)
        return results
    except sqlite3.Error as e:
        print(f"Error fetching expiring info: {e}")
        return []
    finally:
        crud.close_db_connection(conn)

# Add more reporting functions as needed:
# - Assets purchased within a date range
# - Assets assigned to a specific user
# - Count of assets by category/status