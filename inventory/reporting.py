# inventory/reporting.py
import sqlite3 # Needed for sqlite3.Error
import datetime
from datetime import date, timedelta
from typing import List, Dict, Any
from . import crud, models
from .database import DEFAULT_DATABASE_PATH, get_db_connection, close_db_connection

def get_assets_by_status(status: str, db_path=DEFAULT_DATABASE_PATH) -> List[models.HardwareAsset]:
    """Finds hardware assets with a specific status."""
    criteria = {'status': status}
    return crud.search_hardware_assets(criteria, db_path)

def get_info_expiring_soon(days: int = 30, db_path=DEFAULT_DATABASE_PATH) -> List[models.AssociatedInfo]:
    """Finds licenses/warranties expiring within a given number of days."""
    conn = get_db_connection(db_path)
    cursor = conn.cursor() # Use conn.cursor() directly

    cutoff_date = (date.today() + timedelta(days=days)).isoformat()
    today_str = date.today().isoformat()

    sql = """
        SELECT ai.*, hw.name as hardware_name
        FROM associated_info ai
        JOIN hardware_assets hw ON ai.hardware_asset_id = hw.id
        WHERE ai.expiry_date IS NOT NULL
          AND date(ai.expiry_date) >= date(?) /* Ensure date comparison */
          AND date(ai.expiry_date) <= date(?) /* Ensure date comparison */
        ORDER BY date(ai.expiry_date) /* Order by date part */
    """
    results = []
    try:
        # Use sqlite3.Row factory which was set on the connection
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(sql, (today_str, cutoff_date))
        rows = cursor.fetchall()

        for row in rows:
             row_dict = dict(row) # Convert row to dict
             hw_name = row_dict.pop('hardware_name') # Remove extra field before creating model
             # Manually handle date conversion if needed (Row might return strings)
             for key in ['activation_date', 'expiry_date', 'created_at', 'updated_at']:
                 if key in row_dict and isinstance(row_dict[key], str):
                     try:
                         if key.endswith('_date'):
                            row_dict[key] = date.fromisoformat(row_dict[key])
                         else: # timestamp fields
                            # Adjust parsing if needed based on how SQLite stores TIMESTAMP
                            dt_obj = datetime.fromisoformat(row_dict[key].replace(' ', 'T'))
                            row_dict[key] = dt_obj
                     except (ValueError, TypeError):
                        row_dict[key] = None # Handle potential parsing errors


             # Filter out keys not in the model definition (like hardware_name)
             model_fields = {f.name for f in models.AssociatedInfo.__dataclass_fields__.values()}
             filtered_dict = {k: v for k, v in row_dict.items() if k in model_fields}

             info = models.AssociatedInfo(**filtered_dict)
             setattr(info, 'hardware_name', hw_name) # Use setattr for adding temporary attribute
             results.append(info)

    except sqlite3.Error as e:
        print(f"Error fetching expiring info: {e}")
    finally:
        close_db_connection(conn)

    return results