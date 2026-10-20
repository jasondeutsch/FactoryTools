# Factory configurations

This repository owns the [Go](golang/factory.json) and [writing](writing/factory.json) examples. Each directory contains its recipe, member configuration, optional specialist agents, skills and templates. Shared agents and skills live in the repository's root `agents/` and `skills/` directories.

Install these directories alongside the separate Factory framework as described in the [tools README](../README.md). The full schema and launch behavior are documented in `.factory/docs/configuration.md` after installation.

Edit `factory.json` to configure shared execution defaults, member overrides, provider endpoints, selected MCPs/extensions and explicit skill paths. Agents do not have a competing local configuration file. All relative resource paths resolve from the factory file inside the combined `.factory/` directory.

The Go example declares its spec/plan templates under `artifacts`, and the coder's Ralph launch settings under `config.loop`. The writing example declares no starter artifacts. Neither factory's name has special runtime meaning.

The Go Makefile adds golangci-lint, gopls and the selected coder extension to the framework prerequisites. The writing Makefile requires only the shared prerequisites. Run these targets from an installed project, not this source repo: `make -C .factory/factories/golang install`.

Framework synchronization preserves these configurations. Apply tools-repository updates deliberately so team customizations are not overwritten. Recheck startup and start fresh sessions after changing configuration.
