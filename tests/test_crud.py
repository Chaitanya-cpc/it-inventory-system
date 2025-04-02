# tests/test_crud.py
import pytest
import os
from datetime import date
from inventory import crud, models, database

# Use a temporary, separate database for testing
TEST_DB_PATH = os.path.join(os.path.dirname(__file__), 'test_inventory.db')

@pytest.fixture(scope='function') # Use 'function' scope for isolation between tests
def setup_test_db():
    """Fixture to set up and tear down a test database for each test function."""
    # Remove existing test DB if it exists
    if os.path.exists(TEST_DB_PATH):
        os.remove(TEST_DB_PATH)

    # Initialize schema in the new test DB
    database.initialize_database(db_path=TEST_DB_PATH)
    # print(f"Test DB initialized at {TEST_DB_PATH}") # Uncomment for debug

    yield TEST_DB_PATH # Provide the path to the test function

    # Teardown: Remove the test database after the test runs
    # print(f"Removing test DB: {TEST_DB_PATH}") # Uncomment for debug
    if os.path.exists(TEST_DB_PATH):
        os.remove(TEST_DB_PATH)


def test_add_and_get_hardware(setup_test_db):
    """Test adding and retrieving a hardware asset."""
    db_path = setup_test_db
    test_asset_data = {
        'name': 'TEST-LAP-001', 'category': 'Laptop', 'status': 'New',
        'model': 'TestModel X1', 'serial_number': 'TESTSN123',
        'purchase_date': date(2023, 1, 15), 'acquisition_type': 'Purchased',
        'assigned_user': 'testuser', 'location': 'Test Location'
    }
    asset = models.HardwareAsset(**test_asset_data)

    # Add asset
    asset_id = crud.add_hardware_asset(asset, db_path=db_path)
    assert asset_id is not None
    assert asset_id > 0

    # Retrieve asset by ID
    retrieved_asset = crud.get_hardware_asset_by_id(asset_id, db_path=db_path)
    assert retrieved_asset is not None
    assert retrieved_asset.id == asset_id
    assert retrieved_asset.name == test_asset_data['name']
    assert retrieved_asset.serial_number == test_asset_data['serial_number']
    assert retrieved_asset.purchase_date == test_asset_data['purchase_date']

    # Retrieve asset by name
    retrieved_by_name = crud.get_hardware_asset_by_name(test_asset_data['name'], db_path=db_path)
    assert retrieved_by_name is not None
    assert retrieved_by_name.id == asset_id


def test_add_hardware_duplicate_serial(setup_test_db):
    """Test constraint violation for duplicate serial number."""
    db_path = setup_test_db
    asset1 = models.HardwareAsset(name='DUPTEST1', category='Desktop', status='Okay', serial_number='DUP123')
    asset2 = models.HardwareAsset(name='DUPTEST2', category='Desktop', status='Okay', serial_number='DUP123') # Same serial

    asset1_id = crud.add_hardware_asset(asset1, db_path=db_path)
    assert asset1_id is not None

    # Adding asset2 should fail due to unique constraint on serial_number
    asset2_id = crud.add_hardware_asset(asset2, db_path=db_path)
    assert asset2_id is None # Expecting failure (returns None)

    # Verify only one asset was added
    all_assets = crud.get_all_hardware_assets(db_path=db_path)
    assert len(all_assets) == 1


def test_update_hardware(setup_test_db):
    """Test updating a hardware asset."""
    db_path = setup_test_db
    asset = models.HardwareAsset(name='UPDATE-ME', category='Monitor', status='Okay')
    asset_id = crud.add_hardware_asset(asset, db_path=db_path)
    assert asset_id is not None

    updates = {'status': 'Needs Repair', 'location': 'Repair Bench'}
    success = crud.update_hardware_asset(asset_id, updates, db_path=db_path)
    assert success is True

    updated_asset = crud.get_hardware_asset_by_id(asset_id, db_path=db_path)
    assert updated_asset is not None
    assert updated_asset.status == 'Needs Repair'
    assert updated_asset.location == 'Repair Bench'
    assert updated_asset.name == 'UPDATE-ME' # Unchanged field


def test_delete_hardware(setup_test_db):
    """Test deleting a hardware asset."""
    db_path = setup_test_db
    asset = models.HardwareAsset(name='DELETE-ME', category='UPS', status='Dead')
    asset_id = crud.add_hardware_asset(asset, db_path=db_path)
    assert asset_id is not None

    # Verify it exists
    assert crud.get_hardware_asset_by_id(asset_id, db_path=db_path) is not None

    # Delete it
    success = crud.delete_hardware_asset(asset_id, db_path=db_path)
    assert success is True

    # Verify it's gone
    assert crud.get_hardware_asset_by_id(asset_id, db_path=db_path) is None

    # Try deleting again (should fail gracefully)
    success_again = crud.delete_hardware_asset(asset_id, db_path=db_path)
    assert success_again is False


def test_add_info_and_cascade_delete(setup_test_db):
    """Test adding associated info and ensure it's deleted when hardware is deleted."""
    db_path = setup_test_db
    # Add hardware first
    hw = models.HardwareAsset(name='CASCADE-HW', category='Server', status='Deployed')
    hw_id = crud.add_hardware_asset(hw, db_path=db_path)
    assert hw_id is not None

    # Add associated info
    info_data = {
        'hardware_asset_id': hw_id, 'info_type': 'Warranty', 'name': '3yr Onsite',
        'expiry_date': date(2026, 5, 20)
    }
    info = models.AssociatedInfo(**info_data)
    info_id = crud.add_associated_info(info, db_path=db_path)
    assert info_id is not None

    # Verify info exists
    retrieved_info = crud.get_info_for_hardware(hw_id, db_path=db_path)
    assert len(retrieved_info) == 1
    assert retrieved_info[0].id == info_id

    # Delete the hardware asset
    delete_success = crud.delete_hardware_asset(hw_id, db_path=db_path)
    assert delete_success is True

    # Verify the associated info is also gone (due to ON DELETE CASCADE)
    retrieved_info_after_delete = crud.get_info_for_hardware(hw_id, db_path=db_path)
    assert len(retrieved_info_after_delete) == 0

    # Verify the specific info ID is also gone
    assert crud.get_associated_info_by_id(info_id, db_path=db_path) is None


def test_search_hardware(setup_test_db):
    """Test searching hardware assets."""
    db_path = setup_test_db
    # Add some assets
    crud.add_hardware_asset(models.HardwareAsset(name='SEARCH-LAP-01', category='Laptop', status='Deployed', location='Office A'), db_path=db_path)
    crud.add_hardware_asset(models.HardwareAsset(name='SEARCH-LAP-02', category='Laptop', status='Stored', location='Storeroom'), db_path=db_path)
    crud.add_hardware_asset(models.HardwareAsset(name='SEARCH-DESK-01', category='Desktop', status='Deployed', location='Office B'), db_path=db_path)
    crud.add_hardware_asset(models.HardwareAsset(name='SEARCH-MON-01', category='Monitor', status='Okay', location='Office A'), db_path=db_path)

    # Search by category
    laptops = crud.search_hardware_assets({'category': 'Laptop'}, db_path=db_path)
    assert len(laptops) == 2
    assert all(a.category == 'Laptop' for a in laptops)

    # Search by status
    deployed = crud.search_hardware_assets({'status': 'Deployed'}, db_path=db_path)
    assert len(deployed) == 2
    assert all(a.status == 'Deployed' for a in deployed)

    # Search by name (LIKE)
    lap_search = crud.search_hardware_assets({'name': 'SEARCH-LAP'}, db_path=db_path)
    assert len(lap_search) == 2

    # Search by multiple criteria (AND)
    deployed_laptops = crud.search_hardware_assets({'category': 'Laptop', 'status': 'Deployed'}, db_path=db_path)
    assert len(deployed_laptops) == 1
    assert deployed_laptops[0].name == 'SEARCH-LAP-01'

    # Search by location (LIKE)
    office_a = crud.search_hardware_assets({'location': 'Office A'}, db_path=db_path)
    assert len(office_a) == 2

    # Search with no results
    no_results = crud.search_hardware_assets({'name': 'NONEXISTENT'}, db_path=db_path)
    assert len(no_results) == 0