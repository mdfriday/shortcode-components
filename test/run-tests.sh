#!/bin/bash

# Build the project first
echo "Building project..."
npm run build

# Run unit tests
echo "Running unit tests..."
npm test

# Run CommonJS tests
echo "Running CommonJS tests..."
node test/manual/extract-shortcodes.js
node test/manual/global-shortcode.js

# Run ESM tests
echo "Running ESM tests..."
node test/esm/extract-shortcodes.mjs

echo "All tests completed!" 