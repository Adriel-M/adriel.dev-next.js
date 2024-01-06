#!/bin/bash

# Check if .next/install-state.gz exists and copy it to .yarn/install-state.gz
if [ -f ".next/install-state.gz" ]; then
    cp .next/install-state.gz .yarn/install-state.gz
fi

# Set an environment variable YARN_CACHE_FOLDER=./.next/cache/yarn
export YARN_CACHE_FOLDER=./.next/cache/yarn

# Run yarn install --immutable
yarn install --immutable

# Check if .yarn/install-state.gz exists and copy it to .next/install-state.gz
if [ -f ".yarn/install-state.gz" ]; then
    cp .yarn/install-state.gz .next/install-state.gz
fi
