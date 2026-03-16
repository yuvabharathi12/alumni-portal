#!/usr/bin/env bash

# Railway/railpack expects a start script at the repo root.
# This script runs the backend server from the server/ folder.

set -euo pipefail

cd "$(dirname "$0")/server"

# Start the backend server directly.
# Railway (railpack) already provides Node and installs dependencies.
node server.js
