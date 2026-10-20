# Tools

Team-owned factories, worker agents, skills and templates for the separate Factory framework.

- `factories/golang/`: architecture, implementation and independent Go review.
- `factories/writing/`: interactive technical and business writing.
- `agents/`: shared architect and architecture reviewer bundles.
- `skills/`: skills shared across factories.

## Use from an application

Keep this repository and the Factory framework outside the application. Install the framework's Node dependencies following its README, then set its location:

```sh
export FACTORY_HOME=/path/to/factory
```

Create only `factory.json` in the application, adjusting the path to this checkout:

```json
{
  "extends": "../tools/factories/golang/factory.json"
}
```

From the application root:

```sh
"$FACTORY_HOME/orchestrator/start.sh"
```

Or omit project configuration and pass `--factory /path/to/tools/factories/golang/factory.json`. The framework supports `--project /path/to/application` when launching from another directory.

Edit project `factory.json` to override inherited defaults, catalogs or members. Members merge by `name`; nested objects merge, and arrays such as skill selections replace the inherited array. All resource paths resolve from the file declaring them. `@factory/orchestrator` and `@factory/orchestrator/comms/skills/task-comms` select framework resources without copying them here.

The example defaults use OpenRouter. Export credentials in the launching shell or override provider/model settings and catalog entries for your own provider. Never put credential values in configuration. The framework creates native Pi profiles per session.

Task documents and runtime files default to `~/.factory/<project-name>-<path-hash>/runtime/`; project `runtime_dir` overrides that location. The application remains the working directory for implementation.

## Dependencies and workers

```sh
make -C /path/to/tools/factories/golang install
```

This installs framework tools and the Go factory's dependencies. `update` deliberately upgrades them. Docker with Compose is a separate prerequisite. Each agent's `start.sh` uses `FACTORY_HOME`; run it from the application root with project configuration or an explicit `--factory` path. Normally the coordinator starts workers.

## Verification

```sh
FACTORY_FRAMEWORK_ROOT=/path/to/factory node --test tests/*.test.ts factories/golang/tests/*.test.ts
```

The tests load the framework's test harness. Optional live Pi/Ralph verification is described in [the Ralph reference](factories/golang/ralph.md).
