#!/bin/sh
# Standalone Pi entrypoint. The caller owns the working directory and native configuration.
set -eu
agent_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd -P)
if [ -n "${AGENT_INSTRUCTIONS_FILE:-}" ]; then
  # A caller supplied the complete instruction/skill selection.
  test -f "$AGENT_INSTRUCTIONS_FILE" || { echo "Agent instructions file not found: $AGENT_INSTRUCTIONS_FILE" >&2; exit 1; }
  exec "${AGENT_EXECUTABLE:-pi}" --append-system-prompt "$AGENT_INSTRUCTIONS_FILE" "$@"
fi
exec "${AGENT_EXECUTABLE:-pi}" --append-system-prompt "$agent_dir/agent.md" --no-skills --skill "$agent_dir/skills" "$@"
