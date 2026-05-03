#!/usr/bin/env bash
# export_agentsview.sh — Save AgentsView session data to the repo for submission.
# Run from anywhere inside your repo directory:
#   bash export_agentsview.sh

set -euo pipefail

if command -v agentsview >/dev/null 2>&1; then
    if ! agentsview sync; then
        printf 'Warning: agentsview sync failed; continuing anyway.\n' >&2
    fi
fi

# ---------------------------------------------------------------------------
# Locate the AgentsView data directory
# ---------------------------------------------------------------------------
DATA_DIR="${AGENTSVIEW_DATA_DIR:-${AGENT_VIEWER_DATA_DIR:-$HOME/.agentsview}}"
DB_SRC="$DATA_DIR/sessions.db"
ASSETS_SRC="$DATA_DIR/assets"

if [ ! -f "$DB_SRC" ]; then
  echo "ERROR: No AgentsView database found at $DB_SRC"
  echo "       Make sure agentsview has been run at least once."
  exit 1
fi

# ---------------------------------------------------------------------------
# Destination: this repo export folder
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="$SCRIPT_DIR"
mkdir -p "$DEST_DIR"

# ---------------------------------------------------------------------------
# Copy the database — WAL-safe even if the server is still running.
# Falls back to plain cp if sqlite3 CLI is not available.
# ---------------------------------------------------------------------------
DB_DEST="$DEST_DIR/sessions.db"

if command -v sqlite3 &>/dev/null; then
  echo "Exporting database (WAL-safe backup)..."
  sqlite3 "$DB_SRC" ".backup '$DB_DEST'"
else
  echo "sqlite3 not found; using plain copy (stop agentsview first if running)..."
  cp "$DB_SRC" "$DB_DEST"
fi

echo "  Saved: $DB_DEST"

# ---------------------------------------------------------------------------
# Write a README so the recipient knows how to open it
# ---------------------------------------------------------------------------
cat > "$DEST_DIR/README.md" <<'EOF'
# AgentsView Export

This folder contains an exported AgentsView session database. 

**DO NOT DELETE OR MODIFY THE FILES IN THIS FOLDER, as that may corrupt the data.** 

EOF

echo ""
echo "Done! Export saved to: $DEST_DIR"
echo "Commit this folder to your repo before submitting."
