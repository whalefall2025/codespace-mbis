---
name: server-testing-rules-for-playwright
description: Correct procedure for starting a local web server and testing it with playwright-cli inside a GitHub Codespace.
---

# Web Server + Playwright Testing in GitHub Codespaces

This skill defines the correct procedure for starting a local web server and testing it with `playwright-cli` inside a GitHub Codespace.

---

## The Problem

The bash tool waits for ALL processes that hold its output pipe open — not just the shell. When you background a server with `&`, the child process inherits the bash tool's stdout/stderr pipe file descriptors. Even with `> /tmp/log 2>&1`, the inherited pipe FDs remain open. The bash tool sees the pipe is still held open by a living process and waits until its timeout (120s). When the timeout fires, the tool kills the entire process group, taking the server down with it.

`nohup` does not fix this. It only ignores SIGHUP.

I/O redirection (`> file 2>&1 < /dev/null`) does not fix this. It redirects the shell-level descriptors but the child still inherits the original pipe FDs.

---

## The Fix

Two things are required together:

1. **Close inherited file descriptors** in the subshell that launches the server, so the bash tool's pipe sees EOF immediately.
2. **Use `setsid`** so the server runs in a new session and process group, preventing the bash tool from killing it on cleanup.

---

## Required Workflow: Three Separate Bash Calls

Each step MUST be its own bash tool invocation. Never combine steps.

### Step 1: Start the Server

```bash
# Kill any existing server on the target port
lsof -ti :8080 | xargs -r kill -9 2>/dev/null || true
sleep 1

# Start server fully detached with FDs closed
(
  cd /path/to/your/website
  setsid python3 -m http.server 8080 --bind 0.0.0.0 \
    < /dev/null > /tmp/web-server.log 2>&1 &
  echo $! > /tmp/web-server.pid
) &>/dev/null

echo "Server PID: $(cat /tmp/web-server.pid)"
```

Why this works:

- The `(... ) &>/dev/null` wrapper runs the launch commands in a subshell whose stdout and stderr are `/dev/null`. This means the bash tool's pipe gets zero readers immediately and sees EOF — so the bash tool returns instantly.
- `setsid` puts the server in a new session and process group. When the bash tool cleans up its process group, the server is not a member and survives.
- `< /dev/null` detaches stdin from the server process.
- `> /tmp/web-server.log 2>&1` captures the server's own output for debugging.

All four elements are required:

| Element | What it prevents |
|---|---|
| `(... ) &>/dev/null` | Bash tool hanging, waiting for pipe EOF |
| `setsid` | Bash tool killing server on cleanup |
| `< /dev/null` | Server blocking on stdin |
| `> /tmp/web-server.log 2>&1` | Server output going nowhere / holding FDs |

For other server types, change only the server command inside the subshell:

```bash
# Streamlit
(
  cd /path/to/app
  setsid uv run streamlit run app.py \
    --server.port 8080 --server.headless true \
    < /dev/null > /tmp/web-server.log 2>&1 &
  echo $! > /tmp/web-server.pid
) &>/dev/null

# Flask
(
  cd /path/to/app
  setsid uv run python app.py \
    < /dev/null > /tmp/web-server.log 2>&1 &
  echo $! > /tmp/web-server.pid
) &>/dev/null

# Node
(
  cd /path/to/app
  setsid npx serve -l 8080 \
    < /dev/null > /tmp/web-server.log 2>&1 &
  echo $! > /tmp/web-server.pid
) &>/dev/null
```

### Step 2: Verify the Server Is Responding

In a separate bash call, confirm the server is listening before proceeding.

```bash
timeout 30 bash -c '
  until curl -fsS --max-time 2 http://localhost:8080/ >/dev/null 2>&1; do
    echo "Waiting for server..."
    sleep 1
  done
'

if [ $? -eq 0 ]; then
  echo "Server is ready on port 8080"
else
  echo "ERROR: Server failed to start. Diagnostics:"
  echo "--- Log ---"
  cat /tmp/web-server.log 2>/dev/null || echo "(no log file)"
  echo "--- Process ---"
  xargs ps -p < /tmp/web-server.pid 2>/dev/null || echo "Process not found"
  echo "--- Port ---"
  lsof -i :8080 || echo "Nothing listening on port 8080"
fi
```

Do NOT proceed to Step 3 unless this step prints "Server is ready."

### Step 3: Run Playwright Commands

Only after Step 2 succeeds, run `playwright-cli` in a third bash call.

```bash
playwright-cli open http://localhost:8080/
```

Then interact normally.  For example:

```bash
playwright-cli snapshot
playwright-cli click e5
playwright-cli screenshot --filename=website.png
```

## Cleanup

```bash
playwright-cli close
kill "$(cat /tmp/web-server.pid)" 2>/dev/null
rm -f /tmp/web-server.pid /tmp/web-server.log
```

## Hard Rules

| Rule | Reason |
|---|---|
| Always launch the server inside `(... ) &>/dev/null` | Prevents bash tool from hanging on pipe EOF |
| Always use `setsid` | Prevents bash tool from killing server on process group cleanup |
| Always redirect the server's own I/O, `< /dev/null > log 2>&1` | Prevents server from holding FDs or blocking on stdin |
| Never start a server in the foreground | Blocks bash tool until timeout |
| Never combine server startup and testing in one bash call | Server may not be ready; tool may hang |
| Never run `playwright-cli` before curl verification succeeds | Will get `ERR_CONNECTION_REFUSED` |
| Never blindly restart without checking `/tmp/web-server.log` | Wastes turns; diagnose first |
| Always kill existing processes on the port before starting | Avoids "address already in use" errors |
| Always cd into the correct directory inside the subshell | Server serves files relative to cwd |

## Troubleshooting

### Bash tool still hangs on Step 1

You are missing the `(... ) &>/dev/null` wrapper. The server's inherited pipe FDs are keeping the bash tool's pipe open. Wrap the entire launch in a subshell with `&>/dev/null`.

### Server process dies between Step 1 and Step 2

You are missing `setsid`. The bash tool killed the server when it cleaned up its process group. Add `setsid` before the server command.

### `ERR_CONNECTION_REFUSED` in Playwright

Server is not running. Check:

```bash
xargs ps -p < /tmp/web-server.pid 2>/dev/null || echo "Dead"
lsof -i :8080 || echo "Nothing on 8080"
cat /tmp/web-server.log
```

### Server starts but serves wrong content

Ensure the `cd` is inside the subshell, before the server command.

### Port already in use

```bash
lsof -ti :8080 | xargs -r kill -9
sleep 1
```

## GitHub Codespace Port Forwarding

When testing with Playwright inside the Codespace, always use `http://localhost:<port>`. Playwright runs inside the same environment and does not need the forwarded URL. The forwarded URL (`https://<codespace>-8080.app.github.dev`) is only for your local browser outside the Codespace.