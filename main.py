#!/usr/bin/env python3
# main.py
import sys
from inventory import cli # Import the main cli group function

def main():
    """Main function to run the Click CLI application."""
    # Click handles argument parsing and command execution internally
    cli.cli() # Call the main Click group object

if __name__ == "__main__":
    main()