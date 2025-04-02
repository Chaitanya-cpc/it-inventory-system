# inventory/utils.py
from datetime import date, datetime
import re
import ipaddress
import json # For format_output

def format_output(item):
    """Helper to format model object details for printing (e.g., debugging)."""
    if not item:
        return "{}"
    # Handle potential dataclass objects or simple dicts
    details = vars(item) if hasattr(item, '__dict__') else item

    formatted = {}
    for k, v in details.items():
        if k.startswith('_'): continue # Skip private/internal attributes
        if isinstance(v, (date, datetime)):
            formatted[k] = v.isoformat()
        else:
            formatted[k] = v
    # Pretty print JSON representation
    return json.dumps(formatted, indent=2, default=str) # Use default=str for unhandled types


# --- Validators (Can be used by Flask-WTF forms) ---

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
    pattern = re.compile(r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{12})$')
    return bool(pattern.match(mac_str))

# Example of a custom WTForms validator using these utils
# from wtforms.validators import ValidationError
# def ip_address_validator(form, field):
#     if field.data and not is_valid_ip(field.data):
#         raise ValidationError('Invalid IP address format.')