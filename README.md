# Agent tools and factories

Team-owned factory configurations, agent bundles, skills and task templates. This repository supplies the working practices and tool choices used with the separate **Factory framework**. It does not contain the orchestrator, comms server or runtime launcher.

```text
factories/
  golang/    # Go development recipe, member configuration, templates and specialist agents
  writing/   # Interactive technical/business writing recipe and pair writer
agents/
  architect/
  architecture_reviewer/
skills/      # Conventional commits, debugging, Linear context and bounded iteration
tests/      # Support for integration checks against a framework checkout
```

Each `factory.json` explicitly declares its members and resource selections. Nothing is enabled just because it exists in a directory. Shared defaults apply first; each member overrides only what differs. Skills are instructions, not installed tools or permissions.

## Install alongside the framework

First install the Factory framework into your application's `.factory/` using its README. For a new installation, copy this repository's three content directories into the same location:

```sh
cp -R /path/to/tools/factories /path/to/tools/agents /path/to/tools/skills /path/to/project/.factory/
```

The result is `.factory/factories/`, `.factory/agents/`, and `.factory/skills/` alongside the framework's `.factory/orchestrator/`. Review/merge differences instead of copying over an existing team setup. Do not copy this repo's `.git`, root README, or test-support directory into the application.

Paths in `factory.json` are relative to that file in the **installed layout**. For example, `../../agents/architect` selects a shared agent and `../../orchestrator` selects the framework coordinator. The shared task-comms skill remains owned by the framework. Agent start scripts are intended to run from the combined installation, not from this standalone source checkout.

Configure `defaults.provider`, `defaults.model`, the selected provider definition, and any member overrides. The bundled gateway/model values are examples. Keep credentials in environment variables. Define/select MCPs and extensions in the factory configuration; do not edit generated Pi profiles.

## Use a factory

From the application root:

```sh
make -C .factory/factories/golang install
.factory/orchestrator/start.sh --factory golang
```

The factory dependency target includes shared prerequisites, then its specific tools. Docker Compose and credentials remain separate setup. For interactive writing, use the [writing recipe](factories/writing/README.md) and its pair-writer start script.

- [Go recipe](factories/golang/README.md): architecture, approval, implementation and independent review.
- [Ralph usage](factories/golang/ralph.md): this factory's bounded iteration policy and limitations.
- [Writing recipe](factories/writing/README.md).
- [Configuration ownership](factories/README.md).

The full configuration contract lives at `.factory/docs/configuration.md` in the installed framework. The Go factory's `artifacts` map supplies `spec.html` and `plan.html`; its coder's `config.loop` supplies the Ralph prompt, approval requirements and command checks. These are choices made here, not behavior inferred by the framework from the name `golang`.

## Customize and update

Individuals and teams can keep their own repository with the same three-directory layout. Add a factory, reference shared agents/skills, or create specialist bundles under that factory. No registry or package ecosystem is required. The framework's updater leaves these directories alone. Updating this repo does not automatically replace an application's customized copy; compare and apply changes intentionally.

The supplied tools run on the host. Reviewer instructions do not impose filesystem isolation. Linear access, commits, autonomous iterations and external actions still require the applicable authorization.

## Developer checks

With a framework checkout and its development dependencies installed:

```sh
FACTORY_FRAMEWORK_ROOT=/path/to/factory node --testtests/*.test.ts factories/golang/tests/*.test.ts
```

Tests use a temporary combined installation, never an application checkout. The Go check-script test uses fake tools. Set `FACTORY_TEST_PI` and `FACTORY_TEST_RALPH_DIR` to enable the optional native Ralph test with a local deterministic model fixture; it makes no paid model calls. The framework's independent test suite uses synthetic configurations and does not require this repo.
