# inventory/utils.py
from datetime import date, datetime

def parse_date(date_str: str | None) -> date | None:
    """Attempts to parse a date string in YYYY-MM-DD format."""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        print(f"Warning: Invalid date format '{date_str}'. Please use YYYY-MM-DD.")
        return None # Or raise an error

def format_asset(asset):
    """Helper to format asset details for printing."""
    details = vars(asset) # Get attributes as a dict
    # Remove None values for cleaner output, format dates nicely
    formatted_details = {k: (v.isoformat() if isinstance(v, date) else v)
                         for k, v in details.items() if v is not None}
    return formatted_details