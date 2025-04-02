# inventory/models.py
from dataclasses import dataclass
from datetime import date, datetime
from typing import Optional
from flask_login import UserMixin # Import UserMixin for Flask-Login integration
from flask_bcrypt import check_password_hash, generate_password_hash

@dataclass
class HardwareAsset:
    # Required fields first
    name: str
    category: str
    status: str
    # Optional fields (with defaults)
    id: Optional[int] = None
    sub_category: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    purchase_date: Optional[date] = None
    acquisition_type: Optional[str] = None
    assigned_user: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class AssociatedInfo:
    # Required fields first
    hardware_asset_id: int
    info_type: str
    name: str
    # Optional fields (with defaults)
    id: Optional[int] = None
    details: Optional[str] = None
    license_key: Optional[str] = None
    activation_date: Optional[date] = None
    expiry_date: Optional[date] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class User(UserMixin): # Inherit from UserMixin
    # Required fields first (though password_hash is handled specially)
    username: str
    password_hash: str
    # Optional fields (with defaults)
    id: Optional[int] = None
    created_at: Optional[datetime] = None

    # Methods for password management
    def set_password(self, password: str):
        """Hashes the password and stores the hash."""
        # Note: Bcrypt instance needs to be available or passed in
        # We will handle this via current_app in crud.py usually
        # For direct use (less common), you'd need bcrypt directly:
        # from flask_bcrypt import Bcrypt; bcrypt = Bcrypt()
        # self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        # For simplicity in the model itself, we just store the pre-hashed value
        # The hashing logic is better placed in the CRUD function `create_user`
        pass # Logic moved to crud.create_user

    def check_password(self, password: str) -> bool:
        """Checks if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    # Flask-Login requires the get_id method, UserMixin provides a default
    # that returns self.id, which is correct here.