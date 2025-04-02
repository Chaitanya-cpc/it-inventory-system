# inventory/utils.py
from datetime import date, datetime
import re
import ipaddress

# Keep the date parsing simple for now, rely on Click's parsing primarily
# def parse_date(date_str: str | None) -> date | None:
#     # ... (can be simplified or removed if Click handles it)

def format_output(item):
    """Helper to format model object details for printing."""
    if not item:
        return "{}"
    details = vars(item) # Get attributes as a dict
    formatted = {}
    for k, v in details.items():
        if v is not None:
            if isinstance(v, (date, datetime)):
                formatted[k] = v.isoformat()
            else:
                formatted[k] = v
    # Pretty print might be better handled by a dedicated library later
    # For now, just return the cleaned dictionary
    import json
    return json.dumps(formatted, indent=2)


# --- Validators ---

def is_valid_ip(ip_str: str | None) -> bool:
    """Checks if a string is a valid IPv4 or IPv6 address."""
    if not ip_str:
        return True # Allow empty
    try:
        ipaddress.ip_address(ip_str)
        return True
    except ValueError:
        return False

def is_valid_mac(mac_str: str | None) -> bool:
    """Checks if a string is a valid MAC address format."""
    if not mac_str:
        return True # Allow empty
    # Common formats: XX:XX:XX:XX:XX:XX, XX-XX-XX-XX-XX-XX, XXXXXXXXXXXX
    pattern = re.compile(r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{12})$')
    return bool(pattern.match(mac_str))

# Add more validators as needed (e.g., IMEI format)