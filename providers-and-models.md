# Providers and Models

This guide shows how to obtain a model for each agentic coding tool: which plan to consider, which API key to create, and where to track your usage. The codespace already passes the relevant API keys through if you store them as Codespaces secrets at <https://github.com/settings/codespaces> (reload the codespace after adding a key).

> **Privacy reminder.** Free-tier and "free open model" providers (NVIDIA NIM, OpenRouter, Gemini free tier and Google AI Studio free tier) typically retain your prompts and may use them to train future models. **Do not paste personal data, identifiable customer data, course assessment material, or anything confidential into a free-tier model.** When in doubt, use placeholder data for your prototype.

A quick primer on the two ways to authenticate:

- **Account login** — the agent opens a browser, you sign in once, and it remembers you. This is what `gemini`, `copilot`, `claude`, and `codex` use by default.
- **API key** — a long string of characters you copy from the provider's website and paste into the Codespaces secrets page. The agent reads it from the environment automatically.

The recommended Codespaces-secret name for each provider is shown next to the API-key link. These names are exactly what `mbis doctor` checks.

---

## Gemini (Google)

Every Google account comes with free credits towards Gemini-CLI. The CLI itself signs in with your Google account, so no API key is needed for normal use. 

- Premium plans are also available: <https://gemini.google/nz/subscriptions/?hl=en-GB> *(note: only the **AI Pro** plan tops up your AI credits — AI Plus does not, it has the same Gemini-CLI limits as the free tier.)*

If you'd like to plug Gemini models into OpenCode or Pi instead, create a free **AI Studio** API key.  This gives you access to a broader range of models, such as the open weight model Gemma 4 31B which has very generous usage limits.

- AI Studio API key: <https://aistudio.google.com/api-keys> → Codespaces secret name: `GEMINI_API_KEY` and `GOOGLE_GENERATIVE_AI_API_KEY` (note: create two keys, one for each secret name - use the same value for each API key)
- Usage dashboard: AI Studio: <https://aistudio.google.com/app/rate-limit>

## OpenCode Go

A low-cost subscription with generous usage limits that gives access to open models from Chinese AI labs (e.g. Kimi, MiniMax, Deepseek, GLM, Qwen). Works inside `opencode` and `pi`.  OpenCode states that the inference providers do zero-data retention and do not train models from user data.  The models are hosted by infrastructure partners in the EU, in the USA, and in Singapore (not in China). 

- Plan + sign-up: <https://opencode.ai/go>
- Codespaces secret name: `OPENCODE_API_KEY`
- Usage dashboard: your OpenCode account page

## Mistral Le Chat Pro (Vibe API)

A low-cost European option that grants access to Mistral's models, including **Mistral Medium 3.5** — on some benchmarks, not far behind Gemini 3 Flash and Claude Sonnet 4.6. Use the key inside `opencode` or `pi`. (A dedicated `vibe` CLI is also installed if you'd rather use a Mistral-only client.)

- Student discount info (use your `@uclive.ac.nz` address to register): <https://help.mistral.ai/en/articles/347553-as-a-student-am-i-eligible-for-a-discount-on-le-chat-pro>
- API key under "Vibe": <https://console.mistral.ai/api-keys> → Codespaces secret name: `MISTRAL_API_KEY`
- Usage dashboard: <https://console.mistral.ai/usage>

## GitHub Copilot

The **GitHub Copilot Student Plan was discontinued for new sign-ups in late April 2026**. If your registration got approved before then, your existing plan still works for this assignment and gives you access to Sonnet 4.6 and GPT-5.4 through the `copilot` CLI.

- Student program (for context): <https://github.com/education/students>
- Authentication: handled by your GitHub login — no API key needed. If `copilot` asks, run `gh auth login` once.

## Claude (Anthropic)

A premium and expensive option. Available in the codespace but **not required** for this project; the options above are sufficient.

- Plans: <https://claude.com/pricing>
- API console & usage: <https://console.anthropic.com/>
- Codespaces secret names: `ANTHROPIC_API_KEY` (preferred) or `CLAUDE_CODE_OAUTH_TOKEN`

## Codex (OpenAI)

Another premium and more expensive option. ChatGPT Go appears to include some additional Codex credits, though the exact amount is unclear at the time of writing — check the pricing page.

- Plans: <https://chatgpt.com/pricing/>
- Usage dashboard: <https://platform.openai.com/usage>
- Codespaces secret name: `OPENAI_API_KEY`

## OpenRouter

A small selection of free open-source models, in exchange for data retention and use of your prompts for model training.

- Sign-up + keys: <https://openrouter.ai/>
- Codespaces secret name: `OPENROUTER_API_KEY`

## NVIDIA NIM

Free access to a range of open-source models — capped at about 40 requests per minute, with data retention and training. The API is sometimes slow or unreliable.

- API keys: <https://build.nvidia.com/settings/api-keys>
- Codespaces secret name: `NVIDIA_API_KEY`
