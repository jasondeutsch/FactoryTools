# Tools

Team-owned factories, worker agents, skills and templates for the separate Factory framework.

- `factories/golang/`: architecture, implementation and independent Go review.
- `factories/writing/`: interactive technical and business writing.
- `agents/`: all worker bundles, including architecture, Go coding/review, and writing. Factories reference these agents by path.
- `skills/`: skills shared across factories.

## Use from an application

Keep this repository and the Factory framework outside the application. Install the framework's Node dependencies following its README, then set its location:

```sh
export FACTORY_HOME=/path/to/factory
```

Create only `factory.json` in the application, adjusting the path to this checkout:

```json
{
  "extends": "../factory-tools/factories/golang/factory.json"
}
```

From the application root:

```sh
"$FACTORY_HOME/orchestrator/start.sh"
```

Or omit project configuration and pass `--factory /path/to/factory-tools/factories/golang/factory.json`. The framework supports `--project /path/to/application` when launching from another directory.

Edit project `factory.json` to override membership, workflow rules, or selected model/provider. Agent instructions, skills, tools, MCPs and extension packages are owned by each bundle in `agents/`. Members merge by `name`; nested objects merge, and arrays replace. Paths resolve from the file declaring them. The framework adds its coordination skill and Comms delivery to managed sessions.

The agent profiles use OpenRouter and DeepSeek V4 Flash by default. Export `OPENROUTER_API_KEY`, edit an agent profile for another provider, or add a factory member override and its provider definition. Never put credential values in configuration. Factory prepares private Pi profiles for managed sessions.

Task documents and runtime files default to `~/.factory/<project-name>-<path-hash>/runtime/`; project `runtime_dir` overrides that location. The application remains the working directory for implementation.

## Coordinator choice

The command above starts a configured coordinator, normally Pi. You can instead use an existing agent with the framework's coordinator and task-comms skills, a native Comms MCP connection, and host shell/terminal access. The framework's `orchestrator/README.md` documents both setup paths. The existing agent can use `session.ts coordinator --dry-run` to resolve this repository's configuration without starting another session. Loading instructions does not change that agent's model or tools; automatic inbox delivery requires a runner adapter.

## Dependencies and workers

```sh
make -C /path/to/tools/factories/golang install
```

This installs framework tools and the Go factory's dependencies. `update` deliberately upgrades them. Docker with Compose is a separate prerequisite. Each agent's `start.sh` runs Pi with its own model/provider profile and linked skills; it does not depend on Factory. From the application root, run `/path/to/factory-tools/agents/architect/start.sh`. Factory-managed launches use `session.ts` and the member's `entrypoint`. See [agent launch behavior](agents/README.md).

## Verification

```sh
FACTORY_FRAMEWORK_ROOT=/path/to/factory node --test tests/*.test.ts factories/golang/tests/*.test.ts
```

The tests load the framework's test harness. Optional live Pi/Ralph verification is described in [the Ralph reference](factories/golang/ralph.md).
