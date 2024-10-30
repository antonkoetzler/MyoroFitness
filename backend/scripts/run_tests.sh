#!/bin/bash

# Location of where this script is. Used so it can be run from anywhere (i.e. `bash ./scripts/run_tests.sh` or `bash ./run_tests.sh`).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR" || exit

# Clearing the screen.
if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
  clear
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ]]; then
  cls
else
  echo "Unknown OS"
  exit 1
fi

# Argument validation.
if [ "$#" -eq 0 ]; then
  # Help page.
  echo -e "\e[1mScript to run unit tests, integrations tests, or both.\e[0m\n"
  echo -e "\e[3m(This script may be ran from whichever directory you are in.)\e[0m\n"

  echo -e "\e[1mUsage:\e[0m"
  echo -e "bash ./run_tests -u \e[1m    Run unit tests.\e[0m"
  echo -e "bash ./run_tests -i \e[1m    Run integration tests.\e[0m"
  echo -e "bash ./run_tests -b \e[1m    Run both unit and integration tests.\e[0m"
elif [ "$#" -eq 1 ]; then
  # One argument passed, now we verify the argument.
  if [ ${#1} -eq 2 ]; then
    # Valid argument passed; now we verify which argument was provided to run it's respective command.
    if [ $1 = "-u" ]; then
      go test ./unit_tests/...
    elif [ $1 = "-i" ]; then
      go test ./integration_tests/...
    elif [ $1 = "-b" ]; then
      go test ./unit_tests/... ./integration_tests/...
    fi
  else
    echo "Invalid argument (available arguments are -u, -i, & -b. Aborting..."
    exit 1
  fi
else
  echo "One one argument may be provided. Aborting..."
  exit 1
fi
