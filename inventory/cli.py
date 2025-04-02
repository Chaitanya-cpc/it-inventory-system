# inventory/cli.py
import click
from datetime import datetime # Click uses datetime objects
from . import crud, models, database, utils, reporting

# --- Click Type for Date ---
# Allows YYYY-MM-DD input format
class DateType(click.ParamType):
    name = 'date'
    def convert(self, value, param, ctx):
        if value is None:
            return None
        try:
            return datetime.strptime(value, '%Y-%m-%d').date()
        except ValueError:
            self.fail(f"Incorrect date format for {value}. Please use YYYY-MM-DD.", param, ctx)

# --- Reusable Option Decorators ---
# Define common options once to avoid repetition

# Hardware Fields
opt_name = click.option('--name', help='Unique asset name/tag (e.g., "ENG-LAP-005")')
opt_category = click.option('--category', type=click.Choice(['Laptop', 'Desktop', 'Mouse', 'Keyboard', 'Server', 'Printer', 'Wifi', 'Phone', 'Storage Drive', 'Monitor', 'UPS', 'Other'], case_sensitive=False), help='Asset category')
opt_sub_category = click.option('--sub-category', help='Specific type (e.g., "Engineering", "AIO", "Router")')
opt_status = click.option('--status', type=click.Choice(['New', 'Okay', 'Needs Repair', 'Dead', 'Deployed', 'Stored'], case_sensitive=False), help='Current status')
opt_model = click.option('--model', help='Model name/number')
opt_serial = click.option('--serial', help='Serial number or Service Tag')
opt_purchase_date = click.option('--purchase-date', type=DateType(), help='Date of purchase (YYYY-MM-DD)')
opt_acquisition = click.option('--acquisition', type=click.Choice(['Purchased', 'Rented', 'Leased', 'Subscription', 'Other'], case_sensitive=False), help='Acquisition type')
opt_assigned_user = click.option('--user', help='User assigned to the asset')
opt_location = click.option('--location', help='Physical location of the asset')
opt_notes = click.option('--notes', help='General notes about the asset')

# Associated Info Fields
opt_info_hw_id = click.option('--hardware-id', required=True, type=int, help='ID of the associated hardware asset')
opt_info_type = click.option('--type', required=True, type=click.Choice(['Office Suite', 'Firewall', 'Antivirus', 'OS', 'Network', 'Warranty', 'Subscription', 'Other License', 'Configuration', 'Note'], case_sensitive=False), help='Type of information')
opt_info_name = click.option('--name', required=True, help='Name (e.g., "Windows 11 Pro", "Warranty Details")')
opt_info_details = click.option('--details', help='Specific details (IP, MAC, config info, etc.)')
opt_info_key = click.option('--key', help='License key (if applicable)')
opt_info_activation_date = click.option('--activation-date', type=DateType(), help='Activation date (YYYY-MM-DD)')
opt_info_expiry_date = click.option('--expiry-date', type=DateType(), help='Expiry date (YYYY-MM-DD)')
opt_info_notes = click.option('--notes', help='Notes about this specific info/license')


# --- Main CLI Group ---
@click.group()
def cli():
    """IT Inventory Management System CLI."""
    pass # Entry point for commands

# --- Database Command ---
@cli.command('init-db')
def init_db_command():
    """Initializes the database schema if it doesn't exist."""
    try:
        click.echo("Initializing database...")
        database.initialize_database()
        click.echo(f"Database ready at {database.DEFAULT_DATABASE_PATH}")
    except Exception as e:
        click.echo(f"Error initializing database: {e}", err=True)

# --- Hardware Group ---
@cli.group()
def hardware():
    """Manage hardware assets."""
    pass

@hardware.command('add')
@opt_name
@opt_category
@opt_status
@opt_sub_category
@opt_model
@opt_serial
@opt_purchase_date
@opt_acquisition
@opt_assigned_user
@opt_location
@opt_notes
# Make essential fields required via click.option(required=True)
@click.option('--name', required=True, help='Unique asset name/tag (e.g., "ENG-LAP-005")')
@click.option('--category', required=True, type=click.Choice(['Laptop', 'Desktop', 'Mouse', 'Keyboard', 'Server', 'Printer', 'Wifi', 'Phone', 'Storage Drive', 'Monitor', 'UPS', 'Other'], case_sensitive=False), help='Asset category')
@click.option('--status', required=True, type=click.Choice(['New', 'Okay', 'Needs Repair', 'Dead', 'Deployed', 'Stored'], case_sensitive=False), help='Current status')
def add_hardware(**kwargs):
    """Adds a new hardware asset."""
    # kwargs directly maps option names (with dashes converted to underscores)
    # Filter out None values explicitly if model doesn't handle them well,
    # but dataclasses usually do.
    asset_data = {k: v for k, v in kwargs.items() if v is not None}
    asset = models.HardwareAsset(**asset_data)
    asset_id = crud.add_hardware_asset(asset)
    if asset_id:
        click.echo(f"Successfully added hardware asset with ID: {asset_id}")
    else:
        click.echo("Failed to add hardware asset.", err=True)

@hardware.command('list')
@click.option('--id', type=int, help='Show details for a specific hardware ID.')
def list_hardware(id):
    """Lists hardware assets."""
    if id:
        asset = crud.get_hardware_asset_by_id(id)
        if asset:
            click.echo("--- Hardware Asset Detail ---")
            click.echo(utils.format_output(asset))
            # Also list associated info
            associated_infos = crud.get_info_for_hardware(id)
            if associated_infos:
                click.echo("\n--- Associated Info ---")
                for info in associated_infos:
                    click.echo(f"  Info ID: {info.id}, Type: {info.info_type}, Name: {info.name}")
                    # Optionally print full details per info item:
                    # click.echo(utils.format_output(info))
            else:
                click.echo("\nNo associated info found.")
        else:
            click.echo(f"Hardware asset with ID {id} not found.", err=True)
    else:
        assets = crud.get_all_hardware_assets()
        if assets:
            click.echo("--- All Hardware Assets (Summary) ---")
            for asset in assets:
                click.echo(f"ID: {asset.id:<4} Name: {asset.name:<20} Category: {asset.category:<12} Status: {asset.status:<12} Serial: {asset.serial_number or 'N/A'}")
        else:
            click.echo("No hardware assets found.")

@hardware.command('update')
@click.argument('id', type=int)
# Add all updatable fields as options (not required here)
@opt_name
@opt_category
@opt_status
@opt_sub_category
@opt_model
@opt_serial
@opt_purchase_date
@opt_acquisition
@opt_assigned_user
@opt_location
@opt_notes
def update_hardware(id, **kwargs):
    """Updates an existing hardware asset."""
    updates = {k: v for k, v in kwargs.items() if v is not None}
    if not updates:
        click.echo("No update fields provided. Use options like --name, --status, etc.", err=True)
        return

    if crud.update_hardware_asset(id, updates):
        click.echo(f"Successfully updated hardware asset ID: {id}")
    else:
        # CRUD function already prints detailed errors
        click.echo(f"Failed to update hardware asset ID: {id}.", err=True)


@hardware.command('delete')
@click.argument('id', type=int)
@click.option('--yes', is_flag=True, help='Skip confirmation prompt.')
def delete_hardware(id, yes):
    """Deletes a hardware asset and its associated info (use with caution!)."""
    asset = crud.get_hardware_asset_by_id(id)
    if not asset:
        click.echo(f"Hardware asset with ID {id} not found.", err=True)
        return

    if not yes:
        click.confirm(f"Are you sure you want to delete hardware '{asset.name}' (ID: {id}) and ALL associated info?", abort=True)

    if crud.delete_hardware_asset(id):
        click.echo(f"Successfully deleted hardware asset ID: {id}")
    else:
        click.echo(f"Failed to delete hardware asset ID: {id}.", err=True)


@hardware.command('search')
# Add specific search options
@opt_name
@opt_category
@opt_status
@opt_sub_category
@opt_model
@opt_serial
@opt_assigned_user
@opt_location
@opt_acquisition
def search_hardware(**kwargs):
    """Searches for hardware assets based on criteria."""
    criteria = {k: v for k, v in kwargs.items() if v is not None}
    if not criteria:
        click.echo("Please provide at least one search criterion using options like --name, --status, etc.", err=True)
        return

    click.echo(f"Searching hardware with criteria: {criteria}")
    results = crud.search_hardware_assets(criteria)

    if results:
        click.echo("--- Search Results ---")
        for asset in results:
             click.echo(f"ID: {asset.id:<4} Name: {asset.name:<20} Category: {asset.category:<12} Status: {asset.status:<12} Serial: {asset.serial_number or 'N/A'}")
    else:
        click.echo("No hardware assets found matching the criteria.")


# --- Associated Info Group ---
@cli.group('info') # Renamed from 'software'
def associated_info():
    """Manage associated info (licenses, network, warranty, notes, etc.)."""
    pass

@associated_info.command('add')
@opt_info_hw_id
@opt_info_type
@opt_info_name
# Make these optional for add
@opt_info_details
@opt_info_key
@opt_info_activation_date
@opt_info_expiry_date
@opt_info_notes
def add_info(**kwargs):
    """Adds associated info linked to a hardware asset."""
    # Perform specific validation if needed
    # e.g., check IP/MAC format if type is Network and details contains them
    if kwargs.get('info_type') == 'Network' and kwargs.get('details'):
        # Basic check - could be more sophisticated parsing
        if ':' in kwargs['details'] and not utils.is_valid_mac(kwargs['details'].split()[0]): # Rough MAC check
             click.echo(f"Warning: Potential invalid MAC format in details: {kwargs['details']}", err=True)
        if '.' in kwargs['details'] and not utils.is_valid_ip(kwargs['details'].split()[0]): # Rough IP check
            click.echo(f"Warning: Potential invalid IP format in details: {kwargs['details']}", err=True)

    info_data = {k: v for k, v in kwargs.items() if v is not None}
    info = models.AssociatedInfo(**info_data)

    info_id = crud.add_associated_info(info)
    if info_id:
        click.echo(f"Successfully added associated info with ID: {info_id} for hardware ID: {info.hardware_asset_id}")
    else:
        click.echo("Failed to add associated info.", err=True)


@associated_info.command('list')
@click.option('--hardware-id', type=int, help='List info for a specific hardware ID.')
@click.option('--all', is_flag=True, help='List all associated info records (use carefully).')
def list_info(hardware_id, all):
    """Lists associated info records."""
    if hardware_id:
        infos = crud.get_info_for_hardware(hardware_id)
        if infos:
            click.echo(f"--- Associated Info for Hardware ID: {hardware_id} ---")
            for info in infos:
                expiry = f", Expires: {info.expiry_date}" if info.expiry_date else ""
                click.echo(f"  Info ID: {info.id:<4} Type: {info.info_type:<15} Name: {info.name:<25}{expiry}")
        else:
            click.echo(f"No associated info found for hardware ID: {hardware_id}.")
    elif all:
         # Consider adding pagination or limits if this list gets very long
        click.echo("Listing all associated info records is not implemented yet. Use --hardware-id.")
        # all_info = crud.get_all_associated_info() # Need to implement this in crud.py if needed
        # if all_info:
        #     click.echo("--- All Associated Info Records ---")
        #     for info in all_info:
        #          click.echo(f"ID: {info.id}, HW_ID: {info.hardware_asset_id}, Type: {info.info_type}, Name: {info.name}")
        # else:
        #     click.echo("No associated info records found.")
    else:
         click.echo("Use --hardware-id <ID> to list info for specific hardware.", err=True)


@associated_info.command('update')
@click.argument('id', type=int)
# Add updatable fields as options
@click.option('--hardware-id', type=int, help='Move info to a different hardware asset ID.') # Explicit option
@opt_info_type
@opt_info_name
@opt_info_details
@opt_info_key
@opt_info_activation_date
@opt_info_expiry_date
@opt_info_notes
def update_info(id, **kwargs):
    """Updates an existing associated info record."""
    updates = {k: v for k, v in kwargs.items() if v is not None}
    if not updates:
        click.echo("No update fields provided.", err=True)
        return

    # Validation before update if moving hardware
    if 'hardware_id' in updates:
        if not crud.get_hardware_asset_by_id(updates['hardware_id']):
             click.echo(f"Error: Target hardware asset ID {updates['hardware_id']} does not exist. Cannot move info.", err=True)
             return

    if crud.update_associated_info(id, updates):
        click.echo(f"Successfully updated associated info ID: {id}")
    else:
        click.echo(f"Failed to update associated info ID: {id}.", err=True)


@associated_info.command('delete')
@click.argument('id', type=int)
@click.option('--yes', is_flag=True, help='Skip confirmation prompt.')
def delete_info(id, yes):
    """Deletes an associated info record."""
    info = crud.get_associated_info_by_id(id)
    if not info:
        click.echo(f"Associated info record with ID {id} not found.", err=True)
        return

    if not yes:
        click.confirm(f"Are you sure you want to delete info '{info.name}' (ID: {id})?", abort=True)

    if crud.delete_associated_info(id):
        click.echo(f"Successfully deleted associated info ID: {id}")
    else:
        click.echo(f"Failed to delete associated info ID: {id}.", err=True)


# --- Reporting Group ---
@cli.group()
def report():
    """Generate reports about the inventory."""
    pass

@report.command('status')
@click.argument('status', type=click.Choice(['New', 'Okay', 'Needs Repair', 'Dead', 'Deployed', 'Stored'], case_sensitive=False))
def report_by_status(status):
    """Report hardware assets by status."""
    click.echo(f"--- Assets with Status: {status} ---")
    assets = reporting.get_assets_by_status(status)
    if assets:
        for asset in assets:
            click.echo(f"ID: {asset.id:<4} Name: {asset.name:<20} Model: {asset.model or 'N/A'} Serial: {asset.serial_number or 'N/A'}")
    else:
        click.echo(f"No assets found with status '{status}'.")


@report.command('expiring')
@click.option('--days', type=int, default=30, help='Number of days within which items are expiring.')
def report_expiring_info(days):
    """Report licenses/warranties expiring soon."""
    click.echo(f"--- Info Expiring within {days} Days ---")
    infos = reporting.get_info_expiring_soon(days)
    if infos:
        for info in infos:
            # Access the temporarily added hardware name
            hw_name = getattr(info, 'hardware_name', 'Unknown Hardware')
            click.echo(f"Info ID: {info.id:<4} Type: {info.info_type:<15} Name: {info.name:<25} Expires: {info.expiry_date} (Hardware: {hw_name} [ID: {info.hardware_asset_id}])")
    else:
        click.echo(f"No relevant items found expiring within {days} days.")