# web_app/routes.py
from flask import (Blueprint, render_template, request, redirect, url_for, flash,
                   abort) # Import abort for error handling
from flask_login import login_required, current_user
from inventory import crud, models, reporting
from .forms import HardwareForm, AssociatedInfoForm # Import WTForms
from datetime import date

# Create a Blueprint
bp = Blueprint('main', __name__) # No url_prefix, makes these root routes

# === Helper Function ===
def process_form_data(form, model_cls):
    """Extracts valid data from a WTForm matching a model's fields."""
    data = {}
    valid_keys = {f.name for f in model_cls.__dataclass_fields__.values()}
    for key, value in form.data.items():
        if key in valid_keys and key != 'csrf_token': # Exclude non-model fields
            # Handle empty strings for optional fields -> None
            data[key] = value if value != '' else None
    return data

# === Hardware Routes ===

@bp.route('/')
@bp.route('/hardware')
@login_required # Protect this page
def hardware_list():
    """Displays the list of hardware assets."""
    try:
        search_term = request.args.get('search', '')
        assets = []
        if search_term:
            # Simple search across multiple likely fields
             criteria = {
                 'name': search_term,
                 'serial_number': search_term,
                 'model': search_term,
                 'assigned_user': search_term
             }
             # This crude search might need refinement (e.g., separate searches, OR conditions)
             # For now, it searches assets where *any* of these fields match LIKE
             # A more robust search might merge results or build complex SQL.
             # Let's simplify for now and search only by name/serial:
             name_results = crud.search_hardware_assets({'name': search_term})
             serial_results = crud.search_hardware_assets({'serial_number': search_term})
             # Combine and remove duplicates
             combined = {asset.id: asset for asset in name_results + serial_results}
             assets = list(combined.values())
             assets.sort(key=lambda x: x.name) # Sort combined results
             flash(f"Showing search results for '{search_term}'", "info")
        else:
            assets = crud.get_all_hardware_assets()

        return render_template('hardware_list.html',
                               assets=assets,
                               title="Hardware Inventory",
                               search_term=search_term)
    except Exception as e:
        flash(f"Error fetching hardware: {e}", "danger")
        print(f"Error in hardware_list: {e}") # Log error
        return render_template('hardware_list.html', assets=[], title="Hardware Inventory")

@bp.route('/hardware/view/<int:asset_id>')
@login_required
def hardware_view(asset_id):
    """Displays details for a single hardware asset and its associated info."""
    asset = crud.get_hardware_asset_by_id(asset_id)
    if not asset:
        abort(404) # Use Flask's abort for standard errors

    associated_infos = crud.get_info_for_hardware(asset_id)
    # Prepare form for adding new associated info directly on this page
    info_form = AssociatedInfoForm(hardware_asset_id=asset_id) # Pre-set hidden field

    return render_template('hardware_view.html',
                           asset=asset,
                           infos=associated_infos,
                           info_form=info_form, # Pass the form to the template
                           title=f"View: {asset.name}")

@bp.route('/hardware/add', methods=['GET', 'POST'])
@login_required
def hardware_add():
    """Handles adding a new hardware asset using WTForms."""
    form = HardwareForm()
    if form.validate_on_submit():
        try:
            asset_data = process_form_data(form, models.HardwareAsset)
            new_asset = models.HardwareAsset(**asset_data)
            asset_id = crud.add_hardware_asset(new_asset)

            if asset_id:
                flash(f"Hardware asset '{new_asset.name}' added successfully (ID: {asset_id}).", "success")
                return redirect(url_for('main.hardware_view', asset_id=asset_id))
            else:
                flash("Failed to add hardware asset. Check unique fields (Name, Serial).", "danger")
        except Exception as e:
             flash(f"An error occurred saving the asset: {e}", "danger")
             print(f"Error adding hardware: {e}") # Log error

    # For GET or failed validation, render the form
    return render_template('hardware_form.html', title="Add Hardware", form=form, edit_mode=False)


@bp.route('/hardware/edit/<int:asset_id>', methods=['GET', 'POST'])
@login_required
def hardware_edit(asset_id):
    """Handles editing an existing hardware asset using WTForms."""
    asset = crud.get_hardware_asset_by_id(asset_id)
    if not asset:
        abort(404)

    # Populate form with existing data on GET request
    # Pass the asset object directly to the form constructor
    form = HardwareForm(obj=asset)

    if form.validate_on_submit():
        try:
            # Extract validated data into a dictionary for the update function
            updates = process_form_data(form, models.HardwareAsset)
            success = crud.update_hardware_asset(asset_id, updates)

            if success:
                flash(f"Hardware asset '{asset.name}' updated successfully.", "success")
                return redirect(url_for('main.hardware_view', asset_id=asset_id))
            else:
                flash("Failed to update hardware asset. Check unique fields or database logs.", "danger")
        except Exception as e:
            flash(f"An error occurred updating the asset: {e}", "danger")
            print(f"Error updating hardware {asset_id}: {e}")

    # For GET request or failed validation, render the edit form
    # If validation failed, WTForms automatically repopulates fields with submitted data
    return render_template('hardware_form.html', title=f"Edit: {asset.name}", form=form, edit_mode=True, asset_id=asset_id)


@bp.route('/hardware/delete/<int:asset_id>', methods=['POST']) # Use POST only
@login_required
def hardware_delete(asset_id):
    """Handles deleting a hardware asset via POST."""
    # CSRF protection is handled by Flask-WTF implicitly if enabled globally
    # or explicitly via form.validate_on_submit() on a form with CSRF token
    asset = crud.get_hardware_asset_by_id(asset_id)
    if not asset:
         abort(404)

    try:
        asset_name = asset.name # Get name before deletion
        success = crud.delete_hardware_asset(asset_id)
        if success:
            flash(f"Hardware asset '{asset_name}' and associated info deleted.", "success")
        else:
            flash("Failed to delete hardware asset. It might have already been deleted.", "warning")
    except Exception as e:
         flash(f"An error occurred during deletion: {e}", "danger")
         print(f"Error deleting hardware {asset_id}: {e}")

    return redirect(url_for('main.hardware_list'))


# === Associated Info Routes ===

@bp.route('/hardware/<int:asset_id>/info/add', methods=['POST']) # Typically added via hardware view page
@login_required
def info_add(asset_id):
    """Handles adding associated info via a form."""
    # Check if hardware exists
    asset = crud.get_hardware_asset_by_id(asset_id)
    if not asset:
        abort(404)

    # The form is submitted from the hardware_view page normally
    form = AssociatedInfoForm() # Populates from request.form

    if form.validate_on_submit():
        try:
            info_data = process_form_data(form, models.AssociatedInfo)
            # Ensure the hardware_asset_id is correct (it's in the form's hidden field)
            if int(info_data.get('hardware_asset_id')) != asset_id:
                flash("Mismatch in hardware ID.", "danger")
                return redirect(url_for('main.hardware_view', asset_id=asset_id))

            new_info = models.AssociatedInfo(**info_data)
            info_id = crud.add_associated_info(new_info)
            if info_id:
                flash(f"Information '{new_info.name}' added successfully.", "success")
            else:
                flash("Failed to add information.", "danger")
        except Exception as e:
            flash(f"An error occurred saving information: {e}", "danger")
            print(f"Error adding info for hardware {asset_id}: {e}")
    else:
        # Flash form errors if validation fails
        for field, errors in form.errors.items():
            for error in errors:
                flash(f"Error in {getattr(form, field).label.text}: {error}", "danger")

    return redirect(url_for('main.hardware_view', asset_id=asset_id))


@bp.route('/info/edit/<int:info_id>', methods=['GET', 'POST'])
@login_required
def info_edit(info_id):
    """Handles editing an associated info record."""
    info = crud.get_associated_info_by_id(info_id)
    if not info:
        abort(404)

    form = AssociatedInfoForm(obj=info)

    if form.validate_on_submit():
        try:
            updates = process_form_data(form, models.AssociatedInfo)
            # Ensure hardware_asset_id isn't tampered with or handle it explicitly if moving is allowed
            if 'hardware_asset_id' in updates and updates['hardware_asset_id'] != info.hardware_asset_id:
                 # Handle moving info between assets if needed, with validation
                 flash("Moving information between assets is not directly supported via this form.", "warning")
                 # Or implement the logic and remove this check
                 updates['hardware_asset_id'] = info.hardware_asset_id # Keep original HW ID

            success = crud.update_associated_info(info_id, updates)
            if success:
                flash(f"Information '{info.name}' updated successfully.", "success")
                # Redirect back to the parent hardware's view page
                return redirect(url_for('main.hardware_view', asset_id=info.hardware_asset_id))
            else:
                 flash("Failed to update information.", "danger")
        except Exception as e:
             flash(f"An error occurred updating information: {e}", "danger")
             print(f"Error updating info {info_id}: {e}")
             # Re-render form with errors, data is automatically repopulated
    elif request.method == 'POST':
         # Flash validation errors if POST failed validation
         for field, errors in form.errors.items():
            for error in errors:
                flash(f"Error in {getattr(form, field).label.text}: {error}", "danger")


    # For GET or failed POST validation
    return render_template('info_form.html',
                           title=f"Edit Info: {info.name}",
                           form=form,
                           edit_mode=True,
                           info_id=info_id,
                           hardware_id=info.hardware_asset_id) # Pass HW ID for cancel link etc


@bp.route('/info/delete/<int:info_id>', methods=['POST'])
@login_required
def info_delete(info_id):
    """Handles deleting an associated info record via POST."""
    info = crud.get_associated_info_by_id(info_id)
    if not info:
         abort(404)

    hardware_id = info.hardware_asset_id # Get parent ID before deleting for redirect
    info_name = info.name
    try:
        success = crud.delete_associated_info(info_id)
        if success:
            flash(f"Information '{info_name}' deleted successfully.", "success")
        else:
            flash("Failed to delete information.", "warning")
    except Exception as e:
         flash(f"An error occurred deleting information: {e}", "danger")
         print(f"Error deleting info {info_id}: {e}")

    return redirect(url_for('main.hardware_view', asset_id=hardware_id))

# === Reporting Routes ===

@bp.route('/report/status')
@login_required
def report_by_status_form():
     """Shows form/links to select status for report."""
     # Simple version: just list statuses as links
     statuses = ['New', 'Okay', 'Needs Repair', 'Dead', 'Deployed', 'Stored']
     return render_template('report_status_form.html', # Need this template
                            statuses=statuses,
                            title="Assets by Status Report")


@bp.route('/report/status/<status>')
@login_required
def report_by_status_results(status):
    """Displays hardware assets for a given status."""
    # Optional: Validate status against allowed values
    allowed_statuses = {'New', 'Okay', 'Needs Repair', 'Dead', 'Deployed', 'Stored'}
    if status not in allowed_statuses:
        flash("Invalid status for report.", "warning")
        return redirect(url_for('main.report_by_status_form'))

    assets = reporting.get_assets_by_status(status)
    return render_template('report_status_result.html', # Need this template
                           status=status,
                           assets=assets,
                           title=f"Assets with Status: {status}")


@bp.route('/report/expiring')
@login_required
def report_expiring_info():
    """Displays info (licenses/warranties) expiring soon."""
    try:
        days = int(request.args.get('days', 30)) # Default to 30 days
    except ValueError:
        days = 30
        flash("Invalid value for days, using default 30.", "warning")

    expiring_infos = reporting.get_info_expiring_soon(days)
    return render_template('report_expiring.html',
                           days=days,
                           infos=expiring_infos,
                           title=f"Info Expiring within {days} Days")