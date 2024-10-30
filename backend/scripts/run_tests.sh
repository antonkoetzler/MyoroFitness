#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
  clear
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ]]; then
  cls
else
  echo "Unknown OS"
  exit 1
fi

if [ "$#" -eq 0 ]; then
  echo "Script to run unit tests, integration tests, or both.\n"
fi

# go test ./unit_tests/...
# go test ./integration_tests/...
