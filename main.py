#!/usr/bin/env python3
# main.py
import sys
from inventory import cli # Import the cli module from the package

def main():
    """Main function to parse arguments and execute commands."""
    parser = cli.setup_parsers()
    try:
        args = parser.parse_args()
        if hasattr(args, 'func'):
            args.func(args) # Call the handler function set by set_defaults
        else:
            # This might happen if a subparser was invoked without an action
            # Or if the base parser was called without a command
             parser.print_help()
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        # For debugging, you might want to re-raise the exception
        # import traceback
        # traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()