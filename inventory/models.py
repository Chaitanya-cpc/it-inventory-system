# inventory/models.py
from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Optional

# Use Optional[] for fields that can be NULL in the database
@dataclass
class HardwareAsset:
    # Fields WITHOUT default values first
    name: str
    category: str
    status: str

    # Fields WITH default values next (Optional[...] implies default=None)
    id: Optional[int] = None
    sub_category: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    purchase_date: Optional[date] = None
    acquisition_type: Optional[str] = None
    assigned_user: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None # Fetch if needed
    updated_at: Optional[datetime] = None # Fetch if needed


@dataclass
class AssociatedInfo:
    # Fields WITHOUT default values first
    hardware_asset_id: int
    info_type: str
    name: str

    # Fields WITH default values next (Optional[...] implies default=None)
    id: Optional[int] = None
    details: Optional[str] = None
    license_key: Optional[str] = None
    activation_date: Optional[date] = None
    expiry_date: Optional[date] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None