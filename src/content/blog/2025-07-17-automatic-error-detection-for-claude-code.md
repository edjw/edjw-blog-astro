---
title: Making Claude Code see Astro and Vite errors immediately
pubDate: 2025-06-17T11:57:05.245Z
socialDescription: Catch dev errors instantly with Claude Code hooks - no more timeout problems or manual log checking
tags: [javascript, tech, ai, astro]
featured: false
---

I built automatic error detection for Claude Code that catches both server and client-side errors immediately after any code change. It uses PostToolUse hooks to monitor log files and report problems back to Claude within seconds, solving the 2-minute timeout problem that makes traditional log tailing impossible.

Armin Ronacher's [unified logging tip](https://youtu.be/nfOVgz_omlU?t=1734) from his "Agentic Coding" talk was the inspiration. Claude Code can't use blocking commands or `tail -f` due to its timeout, but it needs to see errors immediately.

## The Implementation

### Dev server management and logging Vite and server-side errors

Start your dev server without Claude timing out. Log output from server-side errors and Vite-related errors to a file.

```bash
mkdir -p logs && pnpm dev > logs/vite-dev.log 2>&1 & echo $! > dev.pid
```

When Claude Code tries to run an indefinite process like `pnpm dev`, it can't do anything else. It just waits until timeout. This approach sets it to work in the background and unblocks Claude Code. The `> logs/vite-dev.log` captures all output so Claude can read errors later. The `dev.pid` file lets Claude check if the server's still running or stop it cleanly.

### Client-side error capture

If you have client-side logging that only runs in the browser, we also need to catch browser errors and save to them to a file so Claude can read them.

- Patches console methods
- Captures unhandled errors and promise rejections
- Forwards everything to `/api/log`
- Only runs in development

**Automatic error detection** - Claude knows what broke the instant it happens:

```bash
# Check server-side errors
SERVER_ERRORS=$(tail -n 50 logs/vite-dev.log | grep -E "(\[ERROR\]|ERROR|Internal server error|is not defined|UnhandledRejection|Cannot find module)" | tail -n 5)

# Check client-side errors
CLIENT_ERRORS=$(tail -n 50 logs/client.log | grep -E "(ERROR\.CLIENT|Unhandled Error|Unhandled Promise Rejection)" | tail -n 5)
```

**Claude Code hooks** - trigger error checks after every file change:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write|Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/check-vite-errors.sh"
          }
        ]
      }
    ]
  }
}
```

## How It Works

1. Make a code change
2. PostToolUse hook runs error detection
3. Script checks logs for error patterns
4. Reports errors back to Claude Code
5. Claude knows immediately what broke

Example output when errors are detected:

```text
Development errors detected:
Server-side errors:
[ERROR] Cannot find module '@/components/Missing'
Client-side errors:
[2025-01-17T10:39:24.162Z] ERROR.CLIENT: Unhandled Error: This site is currently under construction
```

## Setup Instructions

1. Add the components to your project
2. Include `ClientConsoleLogger` in at the very top of the `<head>` of  your base layout before anything else (development only)
3. Create the error detection script
4. Configure Claude Code hooks
5. Use the PID-based dev server command

The error patterns work for Vite-based projects. Adjust the regex for other frameworks.

## Why This Matters

You get immediate feedback when something breaks. No waiting, no manual log checking. Claude Code knows what went wrong and can fix it.

Still refining the error patterns and testing across different frameworks. But it's already catching errors I would have missed.

This is for my future reference really but might be handy 🤷‍♂️
