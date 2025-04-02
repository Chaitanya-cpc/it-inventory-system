# web_app/auth.py
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from .forms import LoginForm
from inventory import crud

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    """Handles user login."""
    # If user is already logged in, redirect them away from login page
    if current_user.is_authenticated:
        return redirect(url_for('main.hardware_list'))

    form = LoginForm() # Use the WTForm
    if form.validate_on_submit(): # Handles POST and validation
        username = form.username.data
        password = form.password.data
        remember = form.remember_me.data

        user = crud.get_user_by_username(username)

        if user and user.check_password(password):
            login_user(user, remember=remember)
            flash(f'Welcome back, {user.username}!', 'success')
            # Redirect to the page user was trying to access, or home
            next_page = request.args.get('next')
            return redirect(next_page or url_for('main.hardware_list'))
        else:
            flash('Invalid username or password.', 'danger')

    # For GET request or failed validation, render the login template
    return render_template('auth/login.html', title='Log In', form=form)


@bp.route('/logout')
@login_required # User must be logged in to log out
def logout():
    """Logs the user out."""
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('auth.login'))