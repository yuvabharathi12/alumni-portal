#!/usr/bin/env bash

# Railway/railpack expects a start script at the repo root.
# This script runs the backend server from the server/ folder.

set -euo pipefail

cd "$(dirname "$0")/server"

# Install dependencies if missing (Railway may already install, but safe to run)
npm install

# Start the backend server
npm start
