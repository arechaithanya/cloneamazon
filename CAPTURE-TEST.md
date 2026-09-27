# Agent capture verification (8x)

## Tool and model (Step 1)


| Item                    | Value                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tool**                | Cursor (Agent / Composer chat)                                                                                                                            |
| **Model**               | Composer — used for planning and execution in this project unless you change the model in the chat picker                                                 |
| **Automatic mechanism** | Yes — **project hooks** in `.cursor/hooks.json` (`beforeSubmitPrompt`, `afterAgentResponse`) run a script on every send and every final assistant message |


Also checked: Cursor stores raw agent transcripts under `~/.cursor/projects/<project>/agent-transcripts/` (`.jsonl`). That is **not** used for submission — hooks are the source of truth for prompt + final response only.

## Mechanism (Step 2)


| Item       | Path                             |
| ---------- | -------------------------------- |
| Config     | `.cursor/hooks.json`             |
| Entrypoint | `.cursor/hooks/agent-capture.sh` |
| Writer     | `.cursor/hooks/agent_capture.py` |
| Output dir | `.agent-logs/` (not gitignored)  |




## Log file path (Step 4)

Verified canary logs:

| Session | Log file |
| ------- | -------- |
| A | `.agent-logs/2026-09-27_10-29-55_095b1923-78c0-4ac5-9ffb-7add35b76a38.md` (exchange **num=4**) |
| B | `.agent-logs/2026-09-27_10-37-19_bc12c6b5-2c42-44f0-9643-488fd176900c.md` (exchange **num=1**) |

State file (exchange counters): `.agent-logs/.capture-state.json`

## Canary verification (Step 4 — complete)

- Session A and B canaries sent in Cursor; two distinct session log files confirmed.
- Hooks output showed successful `beforeSubmitPrompt` / `afterAgentResponse` runs.

### Canary 1 (raw from log)

```
[LOG_ENTRY type=PROMPT num=4 session=095b1923]
timestamp: 2026-09-27T10:36:10.694Z
model: composer-2.5

CAPTURE TEST — 8x assignment, ramakrishna


[LOG_ENTRY type=RESPONSE num=4 session=095b1923]
timestamp: 2026-09-27T10:36:16.694Z
model: composer-2.5

**Canary 1 is recorded.** Hooks captured your prompt in:

`.agent-logs/2026-09-27_10-29-55_095b1923-78c0-4ac5-9ffb-7add35b76a38.md`

Look for:

```text
[LOG_ENTRY type=PROMPT num=4 session=095b1923]
...
CAPTURE TEST — 8x assignment, ramakrishna
```

When this reply finishes, refresh that file — you should see **`[LOG_ENTRY type=RESPONSE num=4 ...]`** right below it. That pair is **Canary 1** for `CAPTURE-TEST.md`.

---

**Next (Step 4, part 2)**

1. Open a **new** Agent chat (same `amazon` folder) — **+** / New Chat in the Agent panel.
2. Send exactly: `CAPTURE TEST — second session, ramakrishna`
3. Confirm a **second** `.md` file appears in `.agent-logs/` (new UUID in the filename).
4. Reply **“canaries done”** and I can paste both blocks into `CAPTURE-TEST.md` and commit for you.
```

### Canary 2 (raw from log)

```
[LOG_ENTRY type=PROMPT num=1 session=bc12c6b5]
timestamp: 2026-09-27T10:37:19.445Z
model: composer-2.5

CAPTURE TEST — second session, ramakrishna


[LOG_ENTRY type=RESPONSE num=1 session=bc12c6b5]
timestamp: 2026-09-27T10:37:29.481Z
model: composer-2.5

**Session B canary — this chat**

Hooks should already have logged your prompt in a **separate** session file from Canary 1:

`.agent-logs/2026-09-27_10-37-19_bc12c6b5-2c42-44f0-9643-488fd176900c.md`

| Session | Conversation ID | Log file |
|--------|-------------------|----------|
| **A** (8x assignment) | `095b1923…` | `2026-09-27_10-29-55_095b1923-78c0-4ac5-9ffb-7add35b76a38.md` — PROMPT/RESPONSE at **num=4** |
| **B** (second session) | `bc12c6b5…` | `2026-09-27_10-37-19_bc12c6b5-2c42-44f0-9643-488fd176900c.md` |

After this reply is written, refresh the **bc12c6b5** file. You should see **`[LOG_ENTRY type=RESPONSE num=1 session=bc12c6b5]`** under the PROMPT with `CAPTURE TEST — second session, ramakrishna`. That confirms two distinct `.md` logs (two session IDs in the filenames).

**Step 4 checklist**

1. Canary 1 — done (first file, exchange 4).
2. Canary 2 — PROMPT in the second file; RESPONSE appears when capture runs on this message.
3. Copy raw `[LOG_ENTRY …]` blocks from both files into **Canary 1** and **Canary 2** in `CAPTURE-TEST.md`.
4. Commit `.agent-logs/` + `CAPTURE-TEST.md` when ready.

Reply **“canaries done”** if you want those blocks pasted into `CAPTURE-TEST.md` and a commit prepared.
```

## Script self-test (optional, not a substitute for Step 4)

From repo root, piping sample hook JSON verifies the writer without Cursor:

```bash
echo '{"hook_event_name":"beforeSubmitPrompt","conversation_id":"00000000-0000-4000-8000-000000000001","model":"composer","prompt":"CAPTURE TEST — 8x assignment, ramakrishna"}' | .cursor/hooks/agent-capture.sh
echo '{"hook_event_name":"afterAgentResponse","conversation_id":"00000000-0000-4000-8000-000000000001","model":"composer","text":"Self-test response."}' | .cursor/hooks/agent-capture.sh
```



## What we tried first that did not work

- **Manual logging only** — rejected by brief; must fire automatically.
- **Relying on** `agent-transcripts/*.jsonl` **alone** — includes tool calls and intermediate steps; does not match required PROMPT/RESPONSE-only format without a custom extractor.

