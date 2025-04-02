# web_app/routes.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from inventory import crud, models # Import your existing CRUD functions and models!
from inventory.utils import format_output # Maybe useful for debugging
from datetime import date

# Create a Blueprint - a way to organize groups of related routes
bp = Blueprint('main', __name__)

@bp.route('/')
@bp.route('/hardware')
def hardware_list():
    """Displays the list of hardware assets."""
    try:
        assets = crud.get_all_hardware_assets()
        return render_template('hardware_list.html', assets=assets, title="Hardware Inventory")
    except Exception as e:
        flash(f"Error fetching hardware: {e}", "danger")
        return render_template('hardware_list.html', assets=[], title="Hardware Inventory")


@bp.route('/hardware/view/<int:asset_id>')
def hardware_view(asset_id):
    """Displays details for a single hardware asset and its associated info."""
    asset = crud.get_hardware_asset_by_id(asset_id)
    if not asset:
        flash(f"Hardware asset with ID {asset_id} not found.", "warning")
        return redirect(url_for('main.hardware_list'))

    associated_infos = crud.get_info_for_hardware(asset_id)
    return render_template('hardware_view.html', # You'll need to create this template
                           asset=asset,
                           infos=associated_infos,
                           title=f"View: {asset.name}")

@bp.route('/hardware/add', methods=('GET', 'POST'))
def hardware_add():
    """Handles adding a new hardware asset."""
    if request.method == 'POST':
        # --- Data Extraction from Form ---
        try:
            # Basic data extraction (consider using Flask-WTF for validation/CSRF)
            name = request.form.get('name')
            category = request.form.get('category')
            status = request.form.get('status')
            # Handle optional fields and type conversions
            purchase_dt = None
            purchase_date_str = request.form.get('purchase_date')
            if purchase_date_str:
                try:
                    purchase_dt = date.fromisoformat(purchase_date_str)
                except ValueError:
                    flash(f"Invalid purchase date format: {purchase_date_str}. Use YYYY-MM-DD.", "danger")
                    # Re-render form with error, potentially preserving other inputs
                    return render_template('hardware_form.html', title="Add Hardware", asset=request.form)


            # Create the model object
            asset = models.HardwareAsset(
                name=name,
                category=category,
                status=status,
                sub_category=request.form.get('sub_category') or None,
                model=request.form.get('model') or None,
                serial_number=request.form.get('serial_number') or None,
                purchase_date=purchase_dt,
                acquisition_type=request.form.get('acquisition_type') or None,
                assigned_user=request.form.get('assigned_user') or None,
                location=request.form.get('location') or None,
                notes=request.form.get('notes') or None
            )

            # Call the CRUD function
            asset_id = crud.add_hardware_asset(asset)

            if asset_id:
                flash(f"Hardware asset '{asset.name}' added successfully (ID: {asset_id}).", "success")
                return redirect(url_for('main.hardware_list'))
            else:
                # CRUD function should print specific errors
                flash("Failed to add hardware asset. Check logs or required fields.", "danger")
                # Re-render form, passing back submitted data to refill fields
                return render_template('hardware_form.html', title="Add Hardware", asset=request.form)

        except Exception as e:
             flash(f"An error occurred: {e}", "danger")
             # Re-render form with error
             return render_template('hardware_form.html', title="Add Hardware", asset=request.form)

    # --- GET Request: Show the empty form ---
    return render_template('hardware_form.html', title="Add Hardware")

@bp.route('/hardware/edit/<int:asset_id>', methods=('GET', 'POST'))
def hardware_edit(asset_id):
    """Handles editing an existing hardware asset."""
    asset = crud.get_hardware_asset_by_id(asset_id)
    if not asset:
        flash(f"Hardware asset with ID {asset_id} not found.", "warning")
        return redirect(url_for('main.hardware_list'))

    if request.method == 'POST':
        # Extract updates from form
        updates = {}
        # Compare form data with existing asset data or just take all form fields
        form_data = request.form.to_dict() # Get all form fields as dict
        # Add validation and type conversion as in hardware_add
        purchase_dt = None
        purchase_date_str = form_data.get('purchase_date')
        if purchase_date_str:
            try:
                purchase_dt = date.fromisoformat(purchase_date_str)
                form_data['purchase_date'] = purchase_dt # Update dict with date object
            except ValueError:
                 flash(f"Invalid purchase date format: {purchase_date_str}. Use YYYY-MM-DD.", "danger")
                 return render_template('hardware_form.html', title=f"Edit: {asset.name}", asset=asset, edit_mode=True) # Pass original asset for refill
        else:
             form_data['purchase_date'] = None # Handle empty date field

        # Map form names to model fields if they differ (they shouldn't with our current setup)
        # Only include fields present in the form that are valid model fields
        valid_keys = [f.name for f in models.HardwareAsset.__dataclass_fields__.values() if f.name not in ['id', 'created_at', 'updated_at']]
        for key in valid_keys:
             if key in form_data:
                  # Provide None for empty optional fields
                  updates[key] = form_data.get(key) or None


        if not updates:
            flash("No changes detected or invalid fields submitted.", "info")
            return redirect(url_for('main.hardware_view', asset_id=asset_id))

        try:
            success = crud.update_hardware_asset(asset_id, updates)
            if success:
                flash(f"Hardware asset '{asset.name}' updated successfully.", "success")
                return redirect(url_for('main.hardware_view', asset_id=asset_id))
            else:
                flash("Failed to update hardware asset.", "danger")
                # Re-render form with submitted data
                return render_template('hardware_form.html', title=f"Edit: {asset.name}", asset=form_data, edit_mode=True, asset_id=asset_id)

        except Exception as e:
            flash(f"An error occurred during update: {e}", "danger")
            return render_template('hardware_form.html', title=f"Edit: {asset.name}", asset=form_data, edit_mode=True, asset_id=asset_id)


    # --- GET Request: Show the form pre-filled with asset data ---
    return render_template('hardware_form.html', title=f"Edit: {asset.name}", asset=asset, edit_mode=True, asset_id=asset_id)


@bp.route('/hardware/delete/<int:asset_id>', methods=('POST',)) # Use POST for delete actions
def hardware_delete(asset_id):
    """Handles deleting a hardware asset."""
    # Add CSRF token check here if using Flask-WTF
    asset = crud.get_hardware_asset_by_id(asset_id) # Get name for flash message
    if not asset:
         flash(f"Hardware asset with ID {asset_id} not found.", "warning")
         return redirect(url_for('main.hardware_list'))

    try:
        success = crud.delete_hardware_asset(asset_id)
        if success:
            flash(f"Hardware asset '{asset.name}' and associated info deleted.", "success")
        else:
            flash("Failed to delete hardware asset.", "danger")
    except Exception as e:
         flash(f"An error occurred during deletion: {e}", "danger")

    return redirect(url_for('main.hardware_list'))


# --- Add Routes for Associated Info (similar pattern) ---
# /info/add/<int:hardware_asset_id>
# /info/edit/<int:info_id>
# /info/delete/<int:info_id> (POST)