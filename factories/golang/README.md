# Go development factory

Use for changes to Go applications and services, including existing codebases. Member names and bundle paths are defined in [factory.json](factory.json). Load members only when needed.

The user asks their existing agent to use this factory. The coordinator handles task creation, sessions, messages, and decision records using the operations reference (`$FACTORY_HOME/orchestrator/references/operations.md` in the installed framework). Users give requests, feedback, and approvals in conversation; they do not need to operate the helper scripts.

## Workflow and decisions

The [structured workflow](factory.json) is authoritative for step order, agents, expected outputs, decisions, and revision routes. It moves from specification to architecture review, human design approval, implementation, independent code review, and human acceptance. Architecture findings route back to specification; code findings or final change requests route back to implementation. The task pins this graph when created. The coordinator reads its current position with `workflow.ts status` and obtains dispatch requests with `workflow.ts request`, using the installed framework's operations reference.

The architect refines the skill-owned starter documents in the task directory. Human approval is required for the current `spec.html` and `plan.html` before implementation; it is recorded with exact hashes. The coder works in the project root and uses the bounded Ralph loop configured on its member. Lint and tests are coder tools, not separate agent steps. Reviewers independently examine the actual work and return `changes_requested` with concrete findings when revision is needed. A submitted result does not itself complete the task; final human acceptance follows the code review. Stop and surface unresolved questions or repeated disagreement rather than treating another iteration as automatic success.

## Tools and project context

First inspect the repository's own instructions, build configuration, Go version, module layout, and existing tests. Do not replace working conventions just to match this example. Record the starting state and files changed so independent review can distinguish task work from pre-existing changes. Git diffs may help when available; Git is not required.

Typical tools are `gofmt`, `go test`, `go vet`, and `golangci-lint`. Prefer the project's existing Make targets and lint configuration. The Go coder's optional `/path/to/tools/agents/coder_golang/scripts/check-go.sh` checks formatting, runs tests, and invokes golangci-lint using the project's configuration; agree on the checks first. Never install or upgrade the Go toolchain or other dependencies without authorization.

The Go coder and reviewer bundles enable gopls in their own `pi/mcp.json`. It must already be installed with MCP support; startup checks connect without installing it. If the team intentionally runs without it, disable the `gopls` entry in those agent profiles and record the limitation. Other MCPs are declared in each agent profile. Record which tools were actually available and used, not merely listed in a skill.

The architect and both reviewers declare an optional official Linear MCP connection in their own profiles and link the shared context skill. The connection is disabled by default; enable it in the relevant agent profile when the task asks for ticket context. Its default endpoint exposes read tools only; retrieving a ticket does not authorize commenting, assigning it, or changing its status. Record the source and flag conflicts with the task's approved documents.

Only the coder edits application source during this flow. Reviewers can write their task review documents and run agreed checks; neither instruction nor the supplied Pi tool list enforces filesystem isolation.

## Dependencies

From the application root:

```bash
make -C /path/to/tools/factories/golang install
make -C /path/to/tools/factories/golang update
```

Installs the shared coordinator tools plus golangci-lint, gopls, and the coder's pinned Ralph extension. Run `update` only when intending to upgrade host tools. Set `FACTORY_HOME` to the separate framework checkout before running these targets. Docker with Compose, credentials, and model configuration remain separate setup. See dependency setup (`$FACTORY_HOME/docs/troubleshooting.md#dependency-commands` in the installed framework).
