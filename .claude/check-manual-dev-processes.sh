#!/bin/bash

# Get the command Claude is about to run
command=$(jq -r '.tool_input.command // ""' 2>/dev/null || echo "")

# Check if this is a dev server start command
if echo "$command" | grep -q "pnpm.*dev\|astro.*dev"; then
  # Check for override flag
  if echo "$command" | grep -q "\--force-start"; then
    echo "Override flag detected, allowing dev server start despite orphans" >&2
    exit 0
  fi
  # Look for existing dev processes
  existing_pids=$(pgrep -f "pnpm dev$|astro dev$|vite.*dev$|node.*astro.*dev$")
  
  if [ -n "$existing_pids" ]; then
    # Check if we have a valid Claude-managed PID file
    if [ -f "dev.pid" ] && ps -p $(cat dev.pid) > /dev/null 2>&1; then
      current_pid=$(cat dev.pid)
      # Filter out the current Claude-managed process from the list
      other_pids=$(echo "$existing_pids" | tr ' ' '\n' | grep -v "^$current_pid$" | tr '\n' ' ' | sed 's/[[:space:]]*$//')
      
      if [ -n "$other_pids" ]; then
        echo "Orphaned dev processes detected (PIDs: $other_pids). Clean up with: kill $other_pids" >&2
        exit 2
      fi
      # Only our managed process running, allow restart (will kill and restart)
      exit 0
    else
      # No Claude management but processes exist - block and suggest cleanup
      echo "Dev server processes running (PIDs: $existing_pids). Clean up with: kill $existing_pids" >&2
      exit 2
    fi
  fi
fi

# Allow all other commands
exit 0