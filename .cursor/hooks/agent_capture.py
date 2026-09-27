#!/usr/bin/env python3
"""Append user prompts and final agent responses to .agent-logs/ (8x format)."""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOG_DIR = ROOT / ".agent-logs"
STATE_PATH = LOG_DIR / ".capture-state.json"

AUTHOR = os.environ.get("AGENT_LOG_AUTHOR", "ramakrishna")
TOOL = "cursor"
PROJECT = "amazon-rebuild"
DEFAULT_MODEL = "composer"


def utc_now() -> str:
    now = datetime.now(timezone.utc)
    return now.strftime("%Y-%m-%dT%H:%M:%S.") + f"{now.microsecond // 1000:03d}Z"


def load_state() -> dict:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    if STATE_PATH.exists():
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    return {"sessions": {}}


def save_state(state: dict) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def session_short(conversation_id: str) -> str:
    return conversation_id.replace("-", "")[:8]


def log_filename(conversation_id: str, started: datetime) -> str:
    stamp = started.strftime("%Y-%m-%d_%H-%M-%S")
    return f"{stamp}_{conversation_id}.md"


def write_header(path: Path, meta: dict) -> None:
    front = "\n".join(
        [
            "---",
            f"session_id: {meta['session_id']}",
            f"date: {meta['date']}",
            f"author: {meta['author']}",
            f"model: {meta['model']}",
            f"tool: {meta['tool']}",
            f"project: {meta['project']}",
            f"total_exchanges: {meta['total_exchanges']}",
            f"first_prompt_time: {meta['first_prompt_time']}",
            f"last_prompt_time: {meta['last_prompt_time']}",
            "---",
            "",
            f"# Session Log - {meta['date']}",
            "",
            f"Session: `{meta['short_id']}` | Project: `{PROJECT}` | Author: `{AUTHOR}`",
            "",
            "---",
            "",
        ]
    )
    path.write_text(front, encoding="utf-8")


def append_entry(path: Path, entry_type: str, num: int, short_id: str, timestamp: str, model: str, text: str) -> None:
    block = (
        f"[LOG_ENTRY type={entry_type} num={num} session={short_id}]\n"
        f"timestamp: {timestamp}\n"
        f"model: {model}\n\n"
        f"{text.rstrip()}\n\n\n"
    )
    with path.open("a", encoding="utf-8") as f:
        f.write(block)


def model_name(payload: dict) -> str:
    return payload.get("model_id") or payload.get("model") or DEFAULT_MODEL


def ensure_session(state: dict, conversation_id: str, model: str) -> dict:
    sessions = state.setdefault("sessions", {})
    if conversation_id in sessions:
        return sessions[conversation_id]

    started = datetime.now(timezone.utc)
    path = LOG_DIR / log_filename(conversation_id, started)
    meta = {
        "session_id": conversation_id,
        "date": started.strftime("%Y-%m-%d"),
        "author": AUTHOR,
        "model": model,
        "tool": TOOL,
        "project": PROJECT,
        "total_exchanges": 0,
        "first_prompt_time": utc_now(),
        "last_prompt_time": utc_now(),
        "short_id": session_short(conversation_id),
    }
    write_header(path, meta)
    sessions[conversation_id] = {
        "log_path": str(path.relative_to(ROOT)),
        "exchange_count": 0,
        "first_prompt_time": meta["first_prompt_time"],
    }
    save_state(state)
    return sessions[conversation_id]


def update_frontmatter(path: Path, session: dict, conversation_id: str, model: str, total: int, last_time: str) -> None:
    started_date = session.get("first_prompt_time", utc_now())[:10]
    meta = {
        "session_id": conversation_id,
        "date": started_date,
        "author": AUTHOR,
        "model": model,
        "tool": TOOL,
        "project": PROJECT,
        "total_exchanges": total,
        "first_prompt_time": session["first_prompt_time"],
        "last_prompt_time": last_time,
        "short_id": session_short(conversation_id),
    }
    full = ROOT / session["log_path"]
    content = full.read_text(encoding="utf-8")
    if content.startswith("---"):
        end = content.find("\n---\n", 4)
        if end != -1:
            rest = content[end + 5 :]
            write_header(full, meta)
            with full.open("a", encoding="utf-8") as f:
                f.write(rest)
            return


def main() -> None:
    raw = sys.stdin.read()
    if not raw.strip():
        sys.exit(0)
    payload = json.loads(raw)
    event = payload.get("hook_event_name", "")
    conversation_id = payload.get("conversation_id") or payload.get("session_id")
    if not conversation_id:
        sys.exit(0)

    state = load_state()
    model = model_name(payload)
    session = ensure_session(state, conversation_id, model)
    log_path = ROOT / session["log_path"]
    short_id = session_short(conversation_id)
    ts = utc_now()

    if event == "beforeSubmitPrompt":
        prompt = payload.get("prompt", "")
        session["exchange_count"] = session.get("exchange_count", 0) + 1
        num = session["exchange_count"]
        session["last_prompt_num"] = num
        session["last_prompt_time"] = ts
        append_entry(log_path, "PROMPT", num, short_id, ts, model, prompt)
        update_frontmatter(log_path, session, conversation_id, model, num, ts)
        state["sessions"][conversation_id] = session
        save_state(state)

    elif event == "afterAgentResponse":
        text = payload.get("text", "")
        num = session.get("last_prompt_num") or session.get("exchange_count", 0)
        if num == 0:
            num = 1
        append_entry(log_path, "RESPONSE", num, short_id, ts, model, text)
        state["sessions"][conversation_id] = session
        save_state(state)

    print("{}")
    sys.exit(0)


if __name__ == "__main__":
    main()
