# inventory/cli.py
import argparse
from . import crud, models, database, utils

# --- Argument Parsers ---

def setup_parsers():
    """Sets up the main parser and subparsers for commands."""
    parser = argparse.ArgumentParser(description="Inventory Management System CLI")
    subparsers = parser.add_subparsers(dest='command', help='Available commands', required=True)

    # --- Database Initialization Command ---
    parser_init_db = subparsers.add_parser('init-db', help='Initialize the database schema')
    parser_init_db.set_defaults(func=handle_init_db)

    # --- Hardware Commands ---
    parser_hw = subparsers.add_parser('hardware', help='Manage hardware assets')
    hw_subparsers = parser_hw.add_subparsers(dest='action', help='Hardware actions', required=True)

    # Add Hardware
    parser_add_hw = hw_subparsers.add_parser('add', help='Add a new hardware asset')
    parser_add_hw.add_argument('--name', required=True, help='User-friendly name (e.g., "ENG-LAP-005")')
    parser_add_hw.add_argument('--category', required=True, choices=['Laptop', 'Desktop', 'Mouse', 'Keyboard', 'Server', 'Printer', 'Wifi', 'Phone', 'Storage Drive', 'Monitor', 'UPS', 'Other'], help='Asset category')
    parser_add_hw.add_argument('--status', required=True, choices=['New', 'Okay', 'Needs Repair', 'Dead'], help='Current status')
    parser_add_hw.add_argument('--model', help='Model name/number')
    parser_add_hw.add_argument('--serial', help='Serial number or Service Tag (should be unique)')
    parser_add_hw.add_argument('--purchase_date', help='Date of purchase (YYYY-MM-DD)')
    parser_add_hw.add_argument('--acquisition', choices=['Purchased', 'Rented', 'Leased', 'Other'], help='Acquisition type')
    parser_add_hw.set_defaults(func=handle_add_hardware)

    # List Hardware
    parser_list_hw = hw_subparsers.add_parser('list', help='List hardware assets')
    parser_list_hw.add_argument('--id', type=int, help='List details for a specific hardware ID')
    parser_list_hw.set_defaults(func=handle_list_hardware)

    # Update Hardware
    parser_update_hw = hw_subparsers.add_parser('update', help='Update an existing hardware asset')
    parser_update_hw.add_argument('id', type=int, help='ID of the hardware asset to update')
    # Add arguments for fields that can be updated (optional)
    parser_update_hw.add_argument('--name', help='New user-friendly name')
    parser_update_hw.add_argument('--category', choices=['Laptop', 'Desktop', 'Mouse', 'Keyboard', 'Server', 'Printer', 'Wifi', 'Phone', 'Storage Drive', 'Monitor', 'UPS', 'Other'], help='New asset category')
    parser_update_hw.add_argument('--status', choices=['New', 'Okay', 'Needs Repair', 'Dead'], help='New status')
    parser_update_hw.add_argument('--model', help='New model name/number')
    parser_update_hw.add_argument('--serial', help='New serial number')
    parser_update_hw.add_argument('--purchase_date', help='New date of purchase (YYYY-MM-DD)')
    parser_update_hw.add_argument('--acquisition', choices=['Purchased', 'Rented', 'Leased', 'Other'], help='New acquisition type')
    parser_update_hw.set_defaults(func=handle_update_hardware)


    # Delete Hardware
    parser_delete_hw = hw_subparsers.add_parser('delete', help='Delete a hardware asset')
    parser_delete_hw.add_argument('id', type=int, help='ID of the hardware asset to delete')
    parser_delete_hw.set_defaults(func=handle_delete_hardware)

    # --- Software/License Commands ---
    parser_sw = subparsers.add_parser('software', help='Manage software/licenses/info')
    sw_subparsers = parser_sw.add_subparsers(dest='action', help='Software actions', required=True)

    # Add Software/License
    parser_add_sw = sw_subparsers.add_parser('add', help='Add software/license/info linked to hardware')
    parser_add_sw.add_argument('--hardware_id', type=int, required=True, help='ID of the hardware asset this belongs to')
    parser_add_sw.add_argument('--name', required=True, help='Name (e.g., "Windows 11 Pro", "Office 365 E3", "Warranty")')
    parser_add_sw.add_argument('--type', required=True, choices=['Office Suite', 'Firewall', 'Antivirus', 'OS', 'Network Info', 'Warranty', 'Activation', 'Other License'], help='Type of information')
    parser_add_sw.add_argument('--key', help='License key (if applicable)')
    parser_add_sw.add_argument('--ip', help='IP Address (for Network Info)')
    parser_add_sw.add_argument('--mac', help='MAC Address (for Network Info)')
    parser_add_sw.add_argument('--imei', help='IMEI (for Phones)')
    parser_add_sw.add_argument('--dns', help='DNS Servers (comma-separated, for Network Info)')
    parser_add_sw.add_argument('--activation_date', help='Activation date (YYYY-MM-DD)')
    parser_add_sw.add_argument('--expiry_date', help='Expiry date (YYYY-MM-DD, for licenses/warranty)')
    parser_add_sw.set_defaults(func=handle_add_software)

    # List Software/License
    parser_list_sw = sw_subparsers.add_parser('list', help='List software/licenses')
    parser_list_sw.add_argument('--hardware_id', type=int, help='List software for a specific hardware ID')
    parser_list_sw.add_argument('--all', action='store_true', help='List all software/licenses')
    parser_list_sw.set_defaults(func=handle_list_software)

    # Update Software/License (Simplified - Add specific field arguments as needed)
    parser_update_sw = sw_subparsers.add_parser('update', help='Update existing software/license info')
    parser_update_sw.add_argument('id', type=int, help='ID of the software/license record to update')
    # Add args for fields like --name, --key, --expiry_date etc.
    parser_update_sw.add_argument('--name', help='New name')
    parser_update_sw.add_argument('--type', choices=['Office Suite', 'Firewall', 'Antivirus', 'OS', 'Network Info', 'Warranty', 'Activation', 'Other License'], help='New type')
    parser_update_sw.add_argument('--key', help='New license key')
    parser_update_sw.add_argument('--ip', help='New IP Address')
    parser_update_sw.add_argument('--mac', help='New MAC Address')
    parser_update_sw.add_argument('--imei', help='New IMEI')
    parser_update_sw.add_argument('--dns', help='New DNS Servers')
    parser_update_sw.add_argument('--activation_date', help='New activation date (YYYY-MM-DD)')
    parser_update_sw.add_argument('--expiry_date', help='New expiry date (YYYY-MM-DD)')
    parser_update_sw.add_argument('--hardware_id', type=int, help='Move to different hardware ID')
    parser_update_sw.set_defaults(func=handle_update_software)


    # Delete Software/License
    parser_delete_sw = sw_subparsers.add_parser('delete', help='Delete a software/license record')
    parser_delete_sw.add_argument('id', type=int, help='ID of the software/license record to delete')
    parser_delete_sw.set_defaults(func=handle_delete_software)


    return parser

# --- Command Handler Functions ---

def handle_init_db(args):
    """Handler for the 'init-db' command."""
    try:
        database.initialize_database()
    except Exception as e:
        print(f"Error initializing database: {e}")

def handle_add_hardware(args):
    """Handler for 'hardware add' command."""
    purchase_dt = utils.parse_date(args.purchase_date)
    asset = models.HardwareAsset(
        name=args.name,
        category=args.category,
        status=args.status,
        model=args.model,
        serial_number=args.serial,
        purchase_date=purchase_dt,
        acquisition_type=args.acquisition
    )
    asset_id = crud.add_hardware_asset(asset)
    if asset_id > 0:
        print(f"Successfully added hardware asset with ID: {asset_id}")
    else:
        print("Failed to add hardware asset.")

def handle_list_hardware(args):
    """Handler for 'hardware list' command."""
    if args.id:
        asset = crud.get_hardware_asset_by_id(args.id)
        if asset:
            print("--- Hardware Asset Detail ---")
            print(utils.format_asset(asset))
             # Also list associated software
            software_list = crud.get_software_for_hardware(args.id)
            if software_list:
                print("\n--- Associated Software/Info ---")
                for sw in software_list:
                    print(f"  - {utils.format_asset(sw)}")
            else:
                print("\nNo associated software/info found.")
        else:
            print(f"Hardware asset with ID {args.id} not found.")
    else:
        assets = crud.get_all_hardware_assets()
        if assets:
            print("--- All Hardware Assets ---")
            for asset in assets:
                 # Simplified list view
                print(f"ID: {asset.id}, Name: {asset.name}, Category: {asset.category}, Status: {asset.status}, Serial: {asset.serial_number}")
        else:
            print("No hardware assets found.")

def handle_update_hardware(args):
    """Handler for 'hardware update' command."""
    updates = {}
    if args.name: updates['name'] = args.name
    if args.category: updates['category'] = args.category
    if args.status: updates['status'] = args.status
    if args.model: updates['model'] = args.model
    if args.serial: updates['serial_number'] = args.serial
    if args.purchase_date:
        dt = utils.parse_date(args.purchase_date)
        if dt: updates['purchase_date'] = dt
        else: return # Stop if date is invalid
    if args.acquisition: updates['acquisition_type'] = args.acquisition

    if not updates:
        print("No update fields provided. Use --name, --status, etc.")
        return

    if crud.update_hardware_asset(args.id, updates):
        print(f"Successfully updated hardware asset ID: {args.id}")
    else:
        print(f"Failed to update hardware asset ID: {args.id}. It might not exist or an error occurred.")


def handle_delete_hardware(args):
    """Handler for 'hardware delete' command."""
    confirm = input(f"Are you sure you want to delete hardware asset ID {args.id} and ALL associated software/info? (yes/no): ")
    if confirm.lower() == 'yes':
        if crud.delete_hardware_asset(args.id):
            print(f"Successfully deleted hardware asset ID: {args.id}")
        else:
            print(f"Failed to delete hardware asset ID: {args.id}. It might not exist.")
    else:
        print("Deletion cancelled.")


def handle_add_software(args):
    """Handler for 'software add' command."""
    activation_dt = utils.parse_date(args.activation_date)
    expiry_dt = utils.parse_date(args.expiry_date)

    license_info = models.SoftwareLicense(
        hardware_asset_id=args.hardware_id,
        name=args.name,
        license_type=args.type,
        license_key=args.key,
        ip_address=args.ip,
        mac_address=args.mac,
        imei=args.imei,
        dns_servers=args.dns,
        activation_date=activation_dt,
        expiry_date=expiry_dt
    )
    license_id = crud.add_software_license(license_info)
    if license_id > 0:
        print(f"Successfully added software/license with ID: {license_id} for hardware ID: {args.hardware_id}")
    else:
        print("Failed to add software/license.")


def handle_list_software(args):
    """Handler for 'software list' command."""
    if args.hardware_id:
        software_list = crud.get_software_for_hardware(args.hardware_id)
        if software_list:
            print(f"--- Software/Info for Hardware ID: {args.hardware_id} ---")
            for sw in software_list:
                print(f"  ID: {sw.id}, Name: {sw.name}, Type: {sw.license_type}, Key: {sw.license_key or 'N/A'}, Expires: {sw.expiry_date or 'N/A'}")
        else:
            print(f"No software/info found for hardware ID: {args.hardware_id}.")
    elif args.all:
        all_software = crud.get_all_software_licenses()
        if all_software:
            print("--- All Software/License Records ---")
            for sw in all_software:
                 print(f"ID: {sw.id}, HW_ID: {sw.hardware_asset_id}, Name: {sw.name}, Type: {sw.license_type}")
        else:
            print("No software/license records found.")
    else:
         print("Use --hardware_id <ID> to list software for specific hardware, or --all to list everything.")


def handle_update_software(args):
    """Handler for 'software update' command."""
    updates = {}
    if args.name: updates['name'] = args.name
    if args.type: updates['license_type'] = args.type
    if args.key: updates['license_key'] = args.key
    if args.ip: updates['ip_address'] = args.ip
    if args.mac: updates['mac_address'] = args.mac
    if args.imei: updates['imei'] = args.imei
    if args.dns: updates['dns_servers'] = args.dns
    if args.activation_date:
        dt = utils.parse_date(args.activation_date)
        if dt: updates['activation_date'] = dt
        else: return
    if args.expiry_date:
        dt = utils.parse_date(args.expiry_date)
        if dt: updates['expiry_date'] = dt
        else: return
    if args.hardware_id:
        # Check if target hardware exists before allowing update
        if crud.get_hardware_asset_by_id(args.hardware_id):
            updates['hardware_asset_id'] = args.hardware_id
        else:
            print(f"Error: Target hardware asset ID {args.hardware_id} does not exist. Cannot move software.")
            return

    if not updates:
        print("No update fields provided.")
        return

    if crud.update_software_license(args.id, updates):
        print(f"Successfully updated software/license ID: {args.id}")
    else:
        print(f"Failed to update software/license ID: {args.id}. It might not exist or an error occurred.")

def handle_delete_software(args):
    """Handler for 'software delete' command."""
    confirm = input(f"Are you sure you want to delete software/license record ID {args.id}? (yes/no): ")
    if confirm.lower() == 'yes':
        if crud.delete_software_license(args.id):
            print(f"Successfully deleted software/license ID: {args.id}")
        else:
            print(f"Failed to delete software/license ID: {args.id}. It might not exist.")
    else:
        print("Deletion cancelled.")