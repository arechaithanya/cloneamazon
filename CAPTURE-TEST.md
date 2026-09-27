# Agent capture verification (8x)

## Tool and model (Step 1)

| Item | Value |
|------|--------|
| **Tool** | Cursor (Agent / Composer chat) |
| **Model** | Composer — used for planning and execution in this project unless you change the model in the chat picker |
| **Automatic mechanism** | Yes — **project hooks** in `.cursor/hooks.json` (`beforeSubmitPrompt`, `afterAgentResponse`) run a script on every send and every final assistant message |

Also checked: Cursor stores raw agent transcripts under `~/.cursor/projects/<project>/agent-transcripts/` (`.jsonl`). That is **not** used for submission — hooks are the source of truth for prompt + final response only.

## Mechanism (Step 2)

| Item | Path |
|------|------|
| Config | `.cursor/hooks.json` |
| Entrypoint | `.cursor/hooks/agent-capture.sh` |
| Writer | `.cursor/hooks/agent_capture.py` |
| Output dir | `.agent-logs/` (not gitignored) |

## Log file path (Step 4)

After canaries run in Cursor, logs appear as:

```text
.agent-logs/YYYY-MM-DD_HH-MM-SS_<conversation-id>.md
```

State file (exchange counters): `.agent-logs/.capture-state.json`

## Canary verification (Step 4 — complete in Cursor)

1. **Reload hooks:** save `hooks.json` or restart Cursor so project hooks load (check **Hooks** output channel if needed).
2. **Session A:** send exactly: `CAPTURE TEST — 8x assignment, ramakrishna`
3. Confirm **PROMPT** and **RESPONSE** for that turn in the new `.agent-logs/*.md` file.
4. **Session B:** open a **new** Composer agent chat on this same folder and send: `CAPTURE TEST — second session, ramakrishna`
5. Confirm a **second** log file (or second session block) is created.
6. Paste both canary blocks below (raw, from the log files).

> **Note:** Turns in this chat that happened *before* `hooks.json` was added are not in `.agent-logs/`. Only prompts after hooks are active are captured automatically.

### Canary 1 (paste raw from log)

_(Pending — run in Cursor after hooks load, then paste `[LOG_ENTRY ...]` blocks here.)_

### Canary 2 (paste raw from log)

_(Pending — second Composer session.)_

## Script self-test (optional, not a substitute for Step 4)

From repo root, piping sample hook JSON verifies the writer without Cursor:

```bash
echo '{"hook_event_name":"beforeSubmitPrompt","conversation_id":"00000000-0000-4000-8000-000000000001","model":"composer","prompt":"CAPTURE TEST — 8x assignment, ramakrishna"}' | .cursor/hooks/agent-capture.sh
echo '{"hook_event_name":"afterAgentResponse","conversation_id":"00000000-0000-4000-8000-000000000001","model":"composer","text":"Self-test response."}' | .cursor/hooks/agent-capture.sh
```

## What we tried first that did not work

- **Manual logging only** — rejected by brief; must fire automatically.
- **Relying on `agent-transcripts/*.jsonl` alone** — includes tool calls and intermediate steps; does not match required PROMPT/RESPONSE-only format without a custom extractor.
