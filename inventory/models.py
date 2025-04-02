# inventory/models.py
from dataclasses import dataclass, field
from datetime import date
from typing import Optional

# Using dataclasses for simplicity and type hinting
# Optional[...] means the field can be None

@dataclass
class HardwareAsset:
    id: Optional[int] = None # Assigned by the database
    name: str
    category: str # e.g., 'Laptop', 'Desktop'
    status: str # e.g., 'New', 'Okay'
    model: Optional[str] = None
    serial_number: Optional[str] = None
    purchase_date: Optional[date] = None
    acquisition_type: Optional[str] = None # e.g., 'Purchased', 'Rented'
    # Timestamps usually handled by DB, not needed here unless specifically fetched

@dataclass
class SoftwareLicense:
    id: Optional[int] = None # Assigned by the database
    hardware_asset_id: int # Link to HardwareAsset
    name: str # e.g., 'Windows 11 Pro', 'Office 365 E3'
    license_type: str # e.g., 'OS', 'Office Suite'
    license_key: Optional[str] = None
    ip_address: Optional[str] = None
    mac_address: Optional[str] = None
    imei: Optional[str] = None
    dns_servers: Optional[str] = None
    activation_date: Optional[date] = None
    expiry_date: Optional[date] = None
     # Timestamps usually handled by DB