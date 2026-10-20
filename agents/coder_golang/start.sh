#!/bin/sh
# Run from the application root; FACTORY_HOME points to the framework checkout.
set -eu
: "${FACTORY_HOME:?Set FACTORY_HOME to the Factory framework checkout}"
exec node "$FACTORY_HOME/orchestrator/session.ts" coder_golang "$@"
