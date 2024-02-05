import os

def clear_screen():
    """Clears the console screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

def show_menu():
    """Displays the menu options."""
    clear_screen()
    print("\033[38;2;0;182;255m")  # Set text color to #00b6ff
    print(" ________      ______  _ __      ________   _____ ____  ")
    print("|  ____\ \    / / __ \| |\ \    / /  ____| |_   _/ __ \ ")
    print("| |__   \ \  / / |  | | | \ \  / /| |__      | || |  | |")
    print("|  __|   \ \/ /| |  | | |  \ \/ / |  __|     | || |  | |")
    print("| |____   \  / | |__| | |___\  /  | |____   _| || |__| |")
    print("|______|   \/   \____/|______\/   |______| |_____\____/ ")
    print("\033[0m")  # Reset text color to default

    print("Bot Menu")
    print("1. Snack Strong Oikos Instant Win")
    print("2. Exit")

def run_login():
    """Function to handle login."""
    clear_screen()
    print("Running Snack Strong Oikos Instant Win...")
    os.system("node sweeps.js")

def main():
    """Main function to run the CLI."""
    while True:
        show_menu()
        choice = input("Select a mode (1 or 2): ")

        if choice == '1':
            run_login()
        elif choice == '2':
            print("Exiting...")
            break
        else:
            input("Invalid choice! Press Enter to continue...")
            clear_screen()

if __name__ == "__main__":
    main()
