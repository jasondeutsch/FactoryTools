# Factories

`golang` and `writing` are team configurations used by the separate Factory framework. Each directory contains `factory.json` and a Markdown recipe; some have workflow-specific tests. The Go factory scaffolds its spec and plan from templates owned by the `spec-and-plan` skill. Every team agent bundle lives in root `agents/`, including the coordinator. Factories reference them with paths such as `../../agents/coder_golang`. Native Pi profiles and selected skill links belong to those bundles; factory files keep membership, workflow rules and optional model/provider overrides.

Run them directly from this checkout using a project `factory.json` with `extends`, or the launcher's `--factory` path. Resource paths resolve from their declaring file. Framework resources use `@factory/` references. See the [tools README](../README.md).

Dependency targets run here with `FACTORY_HOME` pointing to the framework: `make -C /path/to/tools/factories/golang install`. No files need to be copied into the application.
