# web_app/forms.py
from flask_wtf import FlaskForm
from wtforms import (StringField, PasswordField, BooleanField, SubmitField,
                     SelectField, TextAreaField, DateField, HiddenField)
from wtforms.validators import (DataRequired, Length, Optional, ValidationError,
                                Email) # Optional: Email validator if needed
# from inventory.utils import is_valid_mac, is_valid_ip # Example for custom validator

# === Custom Validators (Example) ===
# def validate_unique_asset_name(form, field):
#     from inventory import crud
#     # Check only if editing existing asset with different name or adding new
#     if hasattr(form, 'asset_id') and form.asset_id.data: # Check if editing
#         existing_asset = crud.get_hardware_asset_by_id(int(form.asset_id.data))
#         if existing_asset and existing_asset.name == field.data:
#              return # Name hasn't changed, it's valid
#     # Check if name exists otherwise
#     if crud.get_hardware_asset_by_name(field.data):
#          raise ValidationError('Asset name already exists. Please use a unique name.')

# def validate_optional_date(form, field):
#      if field.data and not isinstance(field.data, date):
#          try:
#              datetime.strptime(str(field.data), '%Y-%m-%d').date()
#          except ValueError:
#               raise ValidationError('Invalid date format. Use YYYY-MM-DD.')

# === Forms ===

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=50)])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Log In')


class HardwareForm(FlaskForm):
    # Required Fields
    name = StringField('Name', validators=[DataRequired(), Length(max=100)]) # Add unique validator if desired
    category = SelectField('Category', choices=[ # Make first option empty
        ('', '-- Select Category --'),
        ('Laptop', 'Laptop'), ('Desktop', 'Desktop'), ('Mouse', 'Mouse'),
        ('Keyboard', 'Keyboard'), ('Server', 'Server'), ('Printer', 'Printer'),
        ('Wifi', 'Wifi'), ('Phone', 'Phone'), ('Storage Drive', 'Storage Drive'),
        ('Monitor', 'Monitor'), ('UPS', 'UPS'), ('Other', 'Other')
        ], validators=[DataRequired(message="Please select a category.")])
    status = SelectField('Status', choices=[
        ('', '-- Select Status --'),
        ('New', 'New'), ('Okay', 'Okay'), ('Needs Repair', 'Needs Repair'),
        ('Dead', 'Dead'), ('Deployed', 'Deployed'), ('Stored', 'Stored')
        ], validators=[DataRequired(message="Please select a status.")])

    # Optional Fields
    sub_category = StringField('Sub-Category', validators=[Optional(), Length(max=100)])
    model = StringField('Model', validators=[Optional(), Length(max=100)])
    serial_number = StringField('Serial Number', validators=[Optional(), Length(max=100)]) # Add unique check later if needed
    purchase_date = DateField('Purchase Date (YYYY-MM-DD)', format='%Y-%m-%d', validators=[Optional()])
    acquisition_type = SelectField('Acquisition Type', choices=[
         ('', '-- Optional --'),
         ('Purchased', 'Purchased'), ('Rented', 'Rented'), ('Leased', 'Leased'),
         ('Subscription', 'Subscription'), ('Other', 'Other')
         ], validators=[Optional()])
    assigned_user = StringField('Assigned User', validators=[Optional(), Length(max=100)])
    location = StringField('Location', validators=[Optional(), Length(max=150)])
    notes = TextAreaField('Notes', validators=[Optional(), Length(max=1000)])

    submit = SubmitField('Save Hardware')
    # asset_id = HiddenField() # Useful hidden field if needed to track during edit validation


class AssociatedInfoForm(FlaskForm):
    # hardware_asset_id - usually passed via URL, not form field unless moving item
    hardware_asset_id = HiddenField(validators=[DataRequired()]) # Store parent HW ID
    info_type = SelectField('Information Type', choices=[
        ('', '-- Select Type --'),
        ('Office Suite', 'Office Suite'), ('Firewall', 'Firewall'), ('Antivirus', 'Antivirus'),
        ('OS', 'OS'), ('Network', 'Network'), ('Warranty', 'Warranty'), ('Subscription', 'Subscription'),
        ('Other License', 'Other License'), ('Configuration', 'Configuration'), ('Note', 'Note')
        ], validators=[DataRequired(message="Please select an information type.")])
    name = StringField('Name / Description', validators=[DataRequired(), Length(max=150)])

    # Optional fields
    details = TextAreaField('Details (IP, MAC, Config, User, etc.)', validators=[Optional(), Length(max=1000)])
    license_key = StringField('License Key', validators=[Optional(), Length(max=200)])
    activation_date = DateField('Activation Date (YYYY-MM-DD)', format='%Y-%m-%d', validators=[Optional()])
    expiry_date = DateField('Expiry Date (YYYY-MM-DD)', format='%Y-%m-%d', validators=[Optional()])
    notes = TextAreaField('Notes', validators=[Optional(), Length(max=1000)])

    submit = SubmitField('Save Information')