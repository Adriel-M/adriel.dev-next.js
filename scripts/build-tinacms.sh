#!/usr/bin/env bash

# Check if VERCEL_ENV is set to 'production'
if [ "$VERCEL_ENV" == "production" ]; then
  # If yes, run 'yarn tinacms'
  echo "Running 'yarn tinacms' in production environment..."
  yarn build:tinacms
else
  # If not, print a message
  echo "Not in production environment. Skipping 'yarn tinacms'..."
fi
