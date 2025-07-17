/**
 * Logger - Server-side API endpoint
 *
 * This Astro API endpoint receives log data from the client-side logger and writes it to a log file during development. In production, this route returns 404 and the client-side logger is disabled.
 *
 * Key features:
 * - Development only - returns 404 in production
 * - Handles both single log entries and batches
 * - Auto-creates logs directory if it doesn't exist
 * - Automatic log rotation when files exceed 10MB
 *
 * Endpoints:
 * - POST /api/log - Receives log entries and writes to file
 *
 * Log file location: logs/client.log
 * Log format: [timestamp] LEVEL.SOURCE: message {context}
 * View logs: pnpm logs:tail (real-time) or pnpm logs:last (recent entries)
 */

import { promises as fs } from "fs";
import path from "path";
import type { APIRoute } from "astro";

// Enable server rendering for this API route
// Route will be excluded from static builds automatically
export const prerender = false;

export interface LogEntry {
  level: "info" | "warn" | "error" | "debug";
  message: string;
  source: "client" | "server" | "api" | "frontmatter";
  timestamp: string;
  context?: Record<string, unknown>;
  url?: string;
  userAgent?: string;
}

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "client.log");
const MAX_LOG_SIZE = 10 * 1024 * 1024; // 10MB

// Ensure log directory exists
async function ensureLogDir() {
  try {
    await fs.access(LOG_DIR);
  } catch {
    await fs.mkdir(LOG_DIR, { recursive: true });
  }
}

// Simple log rotation
async function rotateLogIfNeeded() {
  try {
    const stats = await fs.stat(LOG_FILE);
    if (stats.size > MAX_LOG_SIZE) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const rotatedFile = path.join(LOG_DIR, `client-${timestamp}.log`);
      await fs.rename(LOG_FILE, rotatedFile);
      console.log(`Log rotated to ${rotatedFile}`);
    }
  } catch {
    // File doesn't exist yet, that's fine
  }
}

export const GET: APIRoute = async () => {
  if (import.meta.env.PROD) {
    return new Response(null, { status: 404 });
  }

  try {
    await ensureLogDir();
    return new Response(
      JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ status: "error", error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

// Log endpoint
export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.PROD) {
    return new Response(null, { status: 404 });
  }

  try {
    await ensureLogDir();
    await rotateLogIfNeeded();

    if (request.headers.get("Content-Type") === "application/json") {
      const body = await request.json();
      const logs = body.logs || [body]; // Support both single and batch

      const logEntries =
        logs
          .map((log: Partial<LogEntry>) => {
            const {
              level = "info",
              message = "",
              source = "client",
              timestamp = new Date().toISOString(),
              context = {},
            } = log;
            return `[${timestamp}] ${level.toUpperCase()}.${source.toUpperCase()}: ${message}${
              context && Object.keys(context).length > 0
                ? ` ${JSON.stringify(context)}`
                : ""
            }`;
          })
          .join("\n") + "\n";

      await fs.appendFile(LOG_FILE, logEntries);

      return new Response(
        JSON.stringify({ success: true, count: logs.length }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ error: "Content-Type must be application/json" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Failed to write to log file:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Failed to write log", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
