#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

NPM_PACKAGES=(
    bash-language-server
    typescript
    @vtsls/language-server
    @tailwindcss/language-server
    @github/copilot
    @google/gemini-cli
    @kilocode/cli
    opencode-ai
    @openai/codex
    @anthropic-ai/claude-code
    @mariozechner/pi-coding-agent
    @playwright/cli
)

append_unique_line() {
    local file=$1
    local line=$2
    touch "$file"
    if ! grep -Fqx "$line" "$file" 2>/dev/null; then
        printf "%s\n" "$line" >> "$file"
    fi
}

ensure_user_path() {
    mkdir -p "$HOME/.local/bin"
    export PATH="$HOME/.local/bin:$PATH"

    append_unique_line "$HOME/.profile" 'export PATH="$HOME/.local/bin:$PATH"'
    append_unique_line "$HOME/.bashrc" 'export PATH="$HOME/.local/bin:$PATH"'
    append_unique_line "$HOME/.zshrc" 'export PATH="$HOME/.local/bin:$PATH"'
}

install_system_dependencies() {
    echo "Installing system dependencies..."
    sudo apt-get update
    sudo apt-get install -y --no-install-recommends \
        acl \
        curl \
        git \
        make \
        unzip \
        wget \
        xz-utils \
        libssl-dev \
        libxml2-dev \
        libffi-dev \
        zlib1g-dev
    sudo rm -rf /var/lib/apt/lists/*
    echo "✓ System dependencies installed"
}

prepare_agent_state_dirs() {
    echo "Preparing persistent agent config directories..."

    local uid
    local gid
    uid=$(id -u)
    gid=$(id -g)

    if ! command -v sudo >/dev/null 2>&1; then
        echo "Error: sudo is required to fix ownership of mounted agent config volumes." >&2
        return 1
    fi

    local dirs=(
        "$HOME/.claude"
        "$HOME/.claude/skills"
        "$HOME/.claude/agents"

        "$HOME/.codex"
        "$HOME/.codex/agents"

        "$HOME/.gemini"
        "$HOME/.gemini/agents"

        "$HOME/.vibe"
        "$HOME/.vibe/skills"
        "$HOME/.vibe/agents"

        "$HOME/.agents"
        "$HOME/.agents/skills"

        "$HOME/.copilot"
        "$HOME/.copilot/agents"

        "$HOME/.config"
        "$HOME/.config/opencode"
        "$HOME/.config/opencode/agents"

        "$HOME/.config/kilo"
        "$HOME/.config/kilo/agents"

        "$HOME/.pi"
        "$HOME/.pi/agent/"
    )

    for dir in "${dirs[@]}"; do
        sudo mkdir -p "$dir"
        sudo chown -R "${uid}:${gid}" "$dir"
        chmod 700 "$dir" 2>/dev/null || true
    done

    echo "✓ Persistent agent config directories ready"
}

install_agent_tools() {
    command -v npm >/dev/null 2>&1 || {
        echo "npm is required but was not found in this Codespace." >&2
        return 1
    }

    echo "Installing LSPs and agent tools via npm..."
    npm install --global --prefix "$HOME/.local" "${NPM_PACKAGES[@]}"
    echo "✓ LSPs and agent tools installed: ${NPM_PACKAGES[*]}"

    # IBM Bob Shell installation (commented out because oauth doesn't work in codespaces, but can be added back if it is available)
    # npm install -g --prefix "$HOME/.local" "https://s3.us-south.cloud-object-storage.appdomain.cloud/bob-shell/bobshell-$(curl -s https://s3.us-south.cloud-object-storage.appdomain.cloud/bob-shell/bobshell-version.txt).tgz"

    echo "Installing Playwright browsers via Playwright CLI..."
    # Initialize workspace and install browsers for the Node.js Playwright CLI
    (
    cd "$HOME"
    "$HOME/.local/bin/playwright-cli" install --skills
    ) || true
    sudo "$HOME/.local/bin/playwright-cli" install-browser chromium --with-deps || true
    # sudo npx playwright-cli install-deps chromium --yes
    sudo ln -s "$HOME/.local/bin/playwright-cli" /usr/local/bin/playwright-cli
    sudo ln -sf "$HOME/.local/bin/playwright-cli" /usr/local/bin/playwright
    echo "✓ Playwright CLI and Chromium browser installed"

    # ──────────────────────────────────────────────────────
    # Make Playwright CLI skill available globally for Gemini-CLI
    # (Gemini-CLI cannot discover skills from .claude/skills/)
    # ──────────────────────────────────────────────────────
    echo "Configuring Playwright CLI skill for global availability in Gemini-CLI and Mistral Vibe..."

    local playwright_skill_src="$HOME/.claude/skills/playwright-cli"

    local playwright_skill_targets=(
        "$HOME/.agents/skills"
        "$HOME/.vibe/skills"
    )

    for target in "${playwright_skill_targets[@]}"; do
        mkdir -p "$target"
    done

    if [ -d "$playwright_skill_src" ]; then
        for target in "${playwright_skill_targets[@]}"; do
            rm -rf "$target/playwright-cli"
            cp -r "$playwright_skill_src" "$target/"
        done

        echo "✓ Playwright CLI skill installed to ~/.claude/skills and copied to ~/.agents/skills and ~/.vibe/skills"
    else
        echo "⚠ Warning: Playwright CLI skill not found at $playwright_skill_src; skipping global skill copy"
    fi
    echo "Installing uv..."
    if ! command -v uv >/dev/null 2>&1; then
        python3 -m pip install --user --upgrade uv
        hash -r
    fi

    echo "Installing Mistral Vibe via uv..."
    uv tool install --upgrade mistral-vibe

}

#install_lsp_for_agents{
#
    # Enable LSPs for Claude Code and OpenCode.  CoPilot support is experimental and not enabled.
#
#     # ── Claude Code: enable LSP tool integration ──
#     # Note: not enabled because LSP plugin installation requires oauth which doesn't work in Codespaces, but can be added back if it becomes available.

#     local claude_settings="$HOME/.claude/settings.json"
#     if [ ! -f "$claude_settings" ]; then
#         cat > "$claude_settings" <<'SETTINGS'
# {
#   "env": {
#     "ENABLE_LSP_TOOL": "1"
#   },
#   "permissions": {
#     "allow": [],
#     "deny": []
#   }
# }
# SETTINGS
#         chown "${uid}:${gid}" "$claude_settings"
#     fi
#
    # LSP configuration for OpenCode
#
#     local opencode_config="$HOME/.config/opencode/config.json"
#     if [ ! -f "$opencode_config" ]; then
#         cat > "$opencode_config" <<'OCCONFIG'
# {
#   "lsp": {
#     "python": {
#       "command": "pyright-langserver",
#       "args": ["--stdio"]
#     },
#     "typescript": {
#       "command": "vtsls",
#       "args": ["--stdio"]
#     },
#     "tailwindcss": {
#       "command": "tailwindcss-language-server",
#       "args": ["--stdio"]
#     }
#   }
# }
# OCCONFIG
#         chown "${uid}:${gid}" "$opencode_config"
#     fi
#
#}

install_python_stack() {
    echo "Installing Python prototyping stack via uv..."
    
    # Check if requirements.txt exists in the same directory as this script
    local req_file="$REPO_ROOT/.devcontainer/requirements.txt"
    
    if [[ -f "$req_file" ]]; then
        # Use --system because devcontainers usually don't use venvs by default, 
        # and you want these available globally to the student.
        uv pip install --system -r "$req_file"
    else
        echo "Warning: requirements.txt not found at $req_file" >&2
    fi

    uv tool install tavily-cli
    uv tool install ruff

    echo "✓ Python prototyping tools installed via uv"

    # Note: Python Playwright is not installed; browser automation is provided by @playwright/cli.
    # setup.sh exposes it as both `playwright-cli` and `playwright` to match common agent guesses.
    # python3 -m playwright install --with-deps
}

install_mbis_helper() {
    echo "Installing MBIS helper script to ~/.local/bin/mbis..."
    install -m 0755 "$REPO_ROOT/opt/mbis/bin/mbis" "$HOME/.local/bin/mbis"
    echo "✓ MBIS helper script installed to ~/.local/bin/mbis"
}

install_mbis_shell_integration() {
    echo "Installing mbis shell integration..."

    # The wrapper intercepts cd-related commands in the current shell,
    # and delegates everything else to the installed mbis script.
    local snippet
    snippet=$(cat <<'EOF'

# mbis shell integration — added by setup.sh
mbis() {
    if [[ "${1:-}" == "home" ]]; then
        cd "${GITHUB_WORKSPACE:-/workspaces/$(ls /workspaces | head -1)}" || return 1
    elif [[ "${1:-}" == "newproject" ]]; then
        local mbis_project_path_file mbis_project_path mbis_status
        mbis_project_path_file=$(mktemp) || return 1

        MBIS_NEWPROJECT_PATH_FILE="$mbis_project_path_file" command mbis "$@"
        mbis_status=$?

        if [[ "$mbis_status" -eq 0 && -s "$mbis_project_path_file" ]]; then
            mbis_project_path=$(cat "$mbis_project_path_file")
            rm -f "$mbis_project_path_file"
            cd "$mbis_project_path" || return 1
            return 0
        fi

        rm -f "$mbis_project_path_file"
        return "$mbis_status"
    else
        command mbis "$@"
    fi
}
EOF
)

    for rc in "$HOME/.bashrc" "$HOME/.zshrc"; do
        touch "$rc"

        local tmp_rc
        tmp_rc=$(mktemp) || return 1
        awk '
            /^# mbis shell integration/ { skipping = 1; next }
            skipping && /^}$/ { skipping = 0; next }
            !skipping { print }
        ' "$rc" > "$tmp_rc"
        cat "$tmp_rc" > "$rc"
        rm -f "$tmp_rc"

        printf "%s\n" "$snippet" >> "$rc"
    done

    echo "✓ mbis shell integration installed to .bashrc and .zshrc"
}

install_skills() {
    echo "Installing skills to all agent skill directories..."
    local skills_src="$REPO_ROOT/.devcontainer/skills"

    if [ ! -d "$skills_src" ]; then
        echo "⚠ No skills directory found at $skills_src; skipping skill installation."
        return 0
    fi

    local skill_targets=(
        "$HOME/.claude/skills"
        "$HOME/.agents/skills"
        "$HOME/.vibe/skills"
        # "$HOME/.bob/skills"
    )

    for target in "${skill_targets[@]}"; do
        mkdir -p "$target"
        cp -r "$skills_src"/*/ "$target/" 2>/dev/null || true
    done

    # Install Ctx7 skills via CLI for global availability
    npm install -g skills@latest
    npm install -g ctx7@latest

    ctx7_api_key_args=()
    if [ -n "${CONTEXT7_API_KEY:-}" ]; then
        ctx7_api_key_args=(--api-key "$CONTEXT7_API_KEY")
    else
        echo "⚠ CONTEXT7_API_KEY is not set; installing Context7 without an API key."
        echo "  After adding the secret, reload the Codespace and rerun setup if needed."
    fi

    ctx7 setup --cli --universal --yes "${ctx7_api_key_args[@]}" || true
    ctx7 setup --cli --claude --yes "${ctx7_api_key_args[@]}" || true
    ctx7 setup --cli --antigravity --yes "${ctx7_api_key_args[@]}" || true
    echo "✓ Context7 CLI setup complete for global, Claude, and Antigravity scopes"

    # Copy ctx7 skills to all agent skill directories
    if [ -d "$HOME/.claude/skills/find-docs" ]; then
        cp -r "$HOME/.claude/skills/find-docs" "$HOME/.agents/skills/"
        cp -r "$HOME/.claude/skills/find-docs" "$HOME/.vibe/skills/"
        echo "✓ Context7 skill copied to ~/.agents/skills/ and ~/.vibe/skills/ for Claude, CoPilot, Gemini-CLI and Mistral Vibe"
    else
        echo "⚠ Warning: Context7 skill not found at .claude/skills/find-docs; skipping global skill copy"
    fi

    npx skills add https://github.com/tavily-ai/skills --skill '*' -g -a claude-code -a gemini-cli -a codex -a mistral-vibe -a opencode -a kilo -a github-copilot --copy --yes

    echo "✓ Skills installed to all agent skill directories."
}

install_subagents() {
    local agents_src="$REPO_ROOT/.devcontainer/agents"

    if [ ! -d "$agents_src" ]; then
        echo "⚠ No agents directory found at $agents_src; skipping agent installation."
        return 0
    fi

    local agent_targets=(
        "$HOME/.claude/agents"
        "$HOME/.codex/agents"
        "$HOME/.gemini/agents"
        "$HOME/.config/opencode/agents"
        "$HOME/.copilot/agents"
        "$HOME/.config/kilo/agents"
    )

    for target in "${agent_targets[@]}"; do
        mkdir -p "$target"
        cp -r "$agents_src"/*/ "$target/" 2>/dev/null || true
    done

    # Mistral Vibe — uses.toml files from a separate source directory
    local vibe_agents_src="$REPO_ROOT/.devcontainer/agents-mistral-vibe"
    local vibe_agents_target="$HOME/.vibe/agents"

    if [ -d "$vibe_agents_src" ]; then
        mkdir -p "$vibe_agents_target"
        cp -r "$vibe_agents_src"/* "$vibe_agents_target/" 2>/dev/null || true
        echo "✓ Mistral Vibe agents installed to $vibe_agents_target."
    else
        echo "⚠ No Mistral Vibe agents directory found at $vibe_agents_src; skipping."
    fi

    echo "✓ Agents installed to all agent directories."
}

install_agentsview() {
    if ! command -v agentsview >/dev/null 2>&1; then
        echo "Installing AgentsView via curl..."
        curl -fsSL https://agentsview.io/install.sh | bash
        hash -r
        echo "✓ AgentsView installed"
    else
        echo "AgentsView is already installed; skipping."
    fi
}

main() {
    echo "Setting up MBIS Codespace tools..."
    ensure_user_path
    install_system_dependencies
    prepare_agent_state_dirs
    install_agent_tools
    # install_lsp_for_agents
    install_python_stack
    install_mbis_helper
    install_mbis_shell_integration
    install_skills
    install_subagents
    install_agentsview
    echo "MBIS Codespace setup complete."
}

main "$@"
