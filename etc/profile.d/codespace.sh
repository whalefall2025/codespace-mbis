# If not root
if [ "$(whoami)" != "root" ]; then

    # Check if running locally and set $RepositoryName if not already set
    if [[ "$CODESPACES" != "true" && -z "$RepositoryName" && -d /workspaces ]]; then
        export RepositoryName=$(ls -1t --color=never /workspaces | tail -1 | sed 's:/*$::')
        export LOCAL_WORKSPACE_FOLDER="/workspaces/$RepositoryName"
    fi

    # Rewrites URLs of the form http://HOST:PORT as https://$CODESPACE_NAME.app.github.dev:PORT
    _hostname() {
        if [[ "$CODESPACES" == "true" ]]; then
            local url="http://[^:]+:(\x1b\[[0-9;]*m)?([0-9]+)(\x1b\[[0-9;]*m)?"
            while read; do
                echo "$REPLY" | sed -E "s#${url}#https://${CODESPACE_NAME}-\2.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}#"
            done
        else
            tee
        fi
    }

    # Filter out the http-server version information
    _version() {
        local version="http-server version:"
        while read; do
            if [[ ! $REPLY =~ ${version} ]]; then
                echo "$REPLY"
            fi
        done
    }

    # Configure prompt
    _prompt() {
        local dir="$(dirs +0)" # CWD with ~ for home
        dir="${dir%/}/" # Remove trailing slash (in case in /) and then re-append
        dir=${dir#"/workspaces/$RepositoryName/"} # Left-trim workspace
        dir="${dir} $ " # Add prompt
        dir=${dir#" "} # Trim leading whitespace (in case in workspace)
        echo -n "${dir}"
    }
    PS1='$(_prompt)'

    # Configure cd to default to workspace
    if [[ -n "$RepositoryName" ]]; then
        alias cd="HOME=\"/workspaces/$RepositoryName\" cd"
    fi

    # Rewrite URLs in stderr
    flask() {
        command flask "$@" --host=127.0.0.1 2> >(_hostname >&2)
    }

    # Course diagnostics helper
    diagnose() {
        # Define log path (assuming $RepositoryName is set earlier)
        local log_file="/workspaces/$RepositoryName/diagnose.log"

        echo "Running mbis doctor... (this may take a few seconds)"
        
        # 1. 'tee' shows output in terminal and writes to file
        # 2. '>' ensures we start with a clean file every time
        mbis doctor | tee "$log_file"

        # 3. Append extension list silently
        echo -e "\n--- VS Code Extensions ---" >> "$log_file"
        
        # '2>&1' catches any VS Code internal errors so they don't clutter the terminal
        code --list-extensions >> "$log_file" 2>&1

        echo -e "\n✅ Diagnostic complete. Report saved to: $log_file"
    }

    # Rewrite URLs in stdout
    http-server() {
        command http-server "$@" | _hostname | _version | uniq
    }

    # Editor
    export EDITOR="nano"

    # History
    # https://www.shellhacks.com/tune-command-line-history-bash/
    export HISTCONTROL='ignoredupes' # Ignore duplicates
    export PROMPT_COMMAND='history -a' # Store Bash History Immediately

    # Node.js
    export NODE_ENV="dev"

    # Python
    export PATH="$HOME"/.local/bin:"$PATH"
    export PYTHONDONTWRITEBYTECODE="1"
fi
