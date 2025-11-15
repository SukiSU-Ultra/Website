#!/bin/bash

# Install Bun if not already installed
if ! command -v bun &> /dev/null; then
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Install dependencies
bun install

# Build the project
bun run build
