# MBIS Codespace

Welcome to your assignment repository!  When you open up a codespace, it automatically sets up a personal coding environment in the cloud: no installation, no configuration, nothing to do on your own computer. All you need is a browser.

Inside that browser, you get a fully working version of VS Code: a code editor, a file explorer, and a terminal — everything a developer uses, ready to go. All agentic coding tools have been pre-installed with default instructions and skills. You only need to create API keys and/or authenticate your accounts to get started "vibe" coding your prototype.

---

## 1. Get a GitHub account (one-time)

Sign up for free at [github.com](https://github.com) and apply for the GitHub Student Developer Pack using your `@uclive.ac.nz` address — it gives you access to Codespaces hours and a few other useful perks.

- Student Pack: <https://github.com/education/students>

## 2. Open and close your codespace

Open your assignment repository on GitHub, click the green **`< > Code`** button → **Codespaces** tab → **Create codespace on main**.

- **First boot** can take up to ~6 minutes; later boots usually take ~1 minute.
- The codespace **stops automatically after 30 minutes of inactivity**. Your work is preserved.
- To stop it yourself when finishing a session, run `mbis stop` in the terminal.
- **Do not delete a codespace.** Deletion discards anything that has not been saved to your repository.

## 3. Find and use the terminal

The **terminal** is where you launch agents and run `mbis` commands. Inside your codespace's VS Code, open it with **View → Terminal**, the keyboard shortcut **`` Ctrl+` ``** (Mac: **`` Cmd+` ``**), or by dragging the bottom panel upwards. A new tab labelled `bash` appears at the bottom of the screen.

> The chat pane on the right side of VS Code is for **GitHub Copilot only**. Every other agent (`gemini`, `opencode`, `claude`, `codex`, `pi`) runs inside the terminal.

A few small commands you will use often:

**Navigation**

- `pwd` — print working directory; shows where you currently are
- `ls` — list the files in this folder; `ls -la` shows hidden files and detail
- `cd <folder>` — change directory; `cd ..` goes up one level
- `mbis home` — jump back to the workspace home

**Files and folders**

- `mkdir <folder>` — create a new folder
- `rm <file>` — remove a file; `rm -r <folder>` removes a folder and everything in it
- `cp <from> <to>` — copy a file or folder
- `mv <from> <to>` — move or rename a file or folder

**Control**

- **`Ctrl+C`** cancels a running command
- **Up / Down arrows** scroll through commands you have run before

If you see an unfamiliar command or error, copy and paste it into one of the agents and ask what it means. You can also run `mbis help terminal` any time for this same cheat-sheet inside the terminal.

## 4. Save your work

Your work in the codespace is **not** the same as your work in your repository on GitHub. Two helpers keep them in sync:

- **`mbis save`** — a one-command manual save. Run it before breaks, before stopping the codespace, and any time you'd like a clean checkpoint.
- **`mbis sync`** — pulls newer work down from your repository (useful if you've edited files on GitHub.com directly).
- **Auto-save:** an extension called GitDoc quietly uploads your changes to your repository about 30 seconds after each edit. You usually don't have to think about it.

If `mbis save` ever stops with a message about a conflict, paste the message into one of the agentic tools and ask what to do.

## 5. Store your API keys (Codespaces secrets)

Most agentic tools need either an account login or an API key. Store keys as **Codespaces secrets**, not in any project file:

1. Go to <https://github.com/settings/codespaces>.
2. Under **Codespaces secrets**, add a new secret with the name expected by the tool (see [providers-and-models.md](providers-and-models.md)) and the value of your key.
3. Select your assignment repository so the secret is available inside the codespace.
4. **Reload the codespace** after adding or changing a key (`mbis stop`, then reopen it).

Reference: [Managing account-specific secrets for Codespaces](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-your-account-specific-secrets-for-github-codespaces).

> Never paste an API key into a project file or commit it to your repository.

## 6. The agentic coding tools

Six agents are pre-installed. Type the command name into the terminal **from inside your project folder** to launch one.

**Most students will use one of:**

| Command | Tool | Best fit for |
| --- | --- | --- |
| `copilot` | GitHub Copilot CLI | Students with a GitHub Student Plan from before late April 2026 |
| `gemini` | Google Gemini CLI | Anyone with a Google account (free tier is generous) |
| `opencode` | OpenCode | Low-cost paid plans (OpenCode Go, Mistral Le Chat Pro) |

**Also installed**, in case you'd like to compare:

| Command | Tool |
| --- | --- |
| `claude` | Claude Code |
| `codex` | OpenAI Codex |
| `pi` | Pi coding agent |

Inside any agent:

- A **Plan mode** lets you discuss what to do before any files change. A **Build mode** lets the agent edit files. You switch modes with a slash command (e.g. `/plan`) or, in OpenCode, with `Tab`.
- Use `/model` to list the models available and switch from one model to the other.  You can also set the thinking efforts used by the model.  Low effort consumes less tokens and is faster, and High (and for some xHigh) consumes lots of tokens, is slower, but more powerful.  
- `/help` lists what the agent can do. `/exit` (or `/quit`) closes it.

For details on which provider/key each tool needs, see [providers-and-models.md](providers-and-models.md).

## 7. Your project workflow

Each prototype lives in its own folder. Start a new one like this:

```
mbis newproject my-idea
```

The command creates the folder, copies in the agent template files, and moves you into it. Launch any agent from there (`gemini`, `copilot`, `opencode`…), then walk through the five-skill workflow that mirrors the information systems development life cycle:

```
/discover-requirements   →  ask questions until the idea is clear
/write-a-prd             →  capture a product requirements document
/prd-to-specs            →  turn the PRD into technical specifications
/specs-to-plan           →  break the spec into a phased build plan
/tdd                     →  build it, test-first, one slice at a time
```

Each skill is a slash command available inside the agent. Run them in order; each one builds on the document the previous one produced.

## 8. AgentsView dashboard

A dashboard called **AgentsView** runs automatically inside your codespace on port `2223`. Open it from the **Ports** panel at the bottom of VS Code (click the small globe icon next to port 2223).

Use it to:

- See every session you have run with each agent.
- Track your token usage — useful when you're on a free or capped plan.
- Review past conversations when reflecting on your experience for the assignment.

The file `agentsview_export/sessions.db` in your repository is the **assignment evidence** of your sessions. Leave it alone — `mbis save` backs it up automatically each time you save.

## 9. Helper skills

Beyond the five-skill workflow above, these skills are also available as slash commands:

- `/explain-code` — walks you through code with diagrams and analogies.
- `/frontend-design` — designs polished web interfaces.
- `/playwright-cli` - launches a 'headless' browser that allows the agent to browse the web (use primarily to test your web app)
- `/webapp-testing` — drives a real browser to test your app
- `/server-testing-rules-for-playwright` - if your agent gets stuck when testing your web app, tell it to follow this skill

Two further capabilities need an API key (sign in with GitHub at the provider's site):

- **Tavily** for web search inside an agent — <https://docs.tavily.com/documentation/tavily-cli>
- **Context7** for fetching official library documentation.  First create an API key at <https://context7.com/dashboard>. Add it to the Codespace secrets setting at <https://github.com/settings/codespaces> as `CONTEXT7_API_KEY`.  The codespace will ask you to reload - click yes.  Then, run `mbis context7` to install this skill.  

You're welcome to install more skills, but only from reputable sources.

## 10. The `mbis` commands

| Command | What it does |
| --- | --- |
| `mbis newproject <name>` | Create a new project folder and move into it |
| `mbis save` | Save your work and upload it to GitHub |
| `mbis sync` | Pull newer work from your repository |
| `mbis home` | Jump back to the workspace home folder |
| `mbis run [type] [file]` | Run a Python, Node, PHP, or static web app |
| `mbis doctor` | Check that everything is installed and signed in |
| `mbis stop` | Stop the codespace cleanly |
| `mbis update` | Rebuild the codespace (use after the instructor updates configuration) |
| `mbis help [topic]` | Built-in help: `terminal`, `agents`, `run`, `git`, `all` |

Run `mbis help` any time you'd like a refresher.

## 11. Run and view your prototype

The simplest way is to **ask your agent to launch the app for you** — it knows the project layout. To launch it manually:

| App type | Command | Port |
| --- | --- | --- |
| Auto-detect | `mbis run` | depends |
| Python (Flask, FastAPI, generic) | `mbis run python app.py` | 5000 (Flask) / 8000 (FastAPI) |
| Streamlit | `streamlit run app.py` | 8501 |
| Node / static HTML | `mbis run node` | 8080 |
| PHP | `mbis run php public` | 8080 |

Once the app is running, open the **Ports** panel in VS Code, find the port number, and click the small globe icon to open the app in your browser. The codespace forwards these ports automatically.

## 12. What's pre-installed

You don't need to install anything yourself. The codespace already has:

- **Python** with common libraries such as Streamlit, Flask, FastAPI, pandas, plotly, matplotlib
- **Node.js** + TypeScript and Tailwind language servers
- **Playwright** with a Chromium browser, for the `/webapp-testing` skill
- The six agentic coding tools listed above

Run `mbis doctor` to see versions and confirm everything is healthy.

## 13. Upload files to your repository

If you have files (e.g. data, images, PDFs) you'd like to add to your repository without the codespace, use GitHub's web upload:

1. Open your repository on GitHub.com.
2. Click **Add file → Upload files**.
3. Drag your files in, then click **Commit changes**.

Inside the codespace, those files appear after `mbis sync`. There is no need to install Git on your own computer.

Walkthrough: [Beginner's guide to uploading files to GitHub](https://github.blog/developer-skills/github/beginners-guide-to-github-uploading-files-and-folders-to-github/).

## 14. Customise VS Code

- Change the colour theme: <https://code.visualstudio.com/docs/configure/themes>
- Tour of the VS Code interface: <https://code.visualstudio.com/docs/getstarted/userinterface>

## 15. Acknowledgements

- The agent skills in this repository are adapted from Anthropic and Matt Pocock.
  - <https://github.com/anthropics/skills>
  - <https://github.com/mattpocock/skills>
