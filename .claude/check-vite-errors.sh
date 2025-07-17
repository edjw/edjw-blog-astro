#!/bin/bash

# Check for Vite dev server and client-side errors and notify Claude Code
# This script works with Vite-based frameworks (Astro, Next.js, SvelteKit, Vue, React)
# Called by PostToolUse hooks to detect errors automatically

# Only run if we're in a project directory with a dev server
if [ ! -f "dev.pid" ]; then
    exit 0
fi

# Check if dev server is still running
if ! ps -p $(cat dev.pid) > /dev/null 2>&1; then
    echo "Dev server process stopped unexpectedly" >&2
    exit 2
fi

# Check server-side errors (vite-dev.log)
SERVER_ERRORS=""
if [ -f "logs/vite-dev.log" ]; then
    SERVER_ERRORS=$(tail -n 50 logs/vite-dev.log | grep -E "(\[ERROR\]|ERROR|Internal server error|is not defined|UnhandledRejection|Cannot find module|Cannot find package|Cannot apply)" | tail -n 5)
fi

# Check client-side errors (client.log)
CLIENT_ERRORS=""
if [ -f "logs/client.log" ]; then
    CLIENT_ERRORS=$(tail -n 50 logs/client.log | grep -E "(ERROR\.CLIENT|Unhandled Error|Unhandled Promise Rejection)" | tail -n 5)
fi

# Report any errors found
if [ -n "$SERVER_ERRORS" ] || [ -n "$CLIENT_ERRORS" ]; then
    echo "Development errors detected:" >&2
    
    if [ -n "$SERVER_ERRORS" ]; then
        echo "Server-side errors:" >&2
        echo "$SERVER_ERRORS" >&2
    fi
    
    if [ -n "$CLIENT_ERRORS" ]; then
        echo "Client-side errors:" >&2
        echo "$CLIENT_ERRORS" >&2
    fi
    
    exit 2
fi

exit 0