# Factories

`golang` and `writing` are team configurations used by the separate Factory framework. Each directory contains `factory.json` and a Markdown recipe; some have workflow-specific tests. The Go factory scaffolds its spec and plan from templates owned by the `spec-and-plan` skill. Team worker bundles live in root `agents/`; Factory supplies the default coordinator bundle. Factories reference workers with paths such as `../../agents/coder_golang`. Native Pi profiles and selected skill links belong to those bundles; factory files keep membership, workflow rules and optional model/provider overrides.

Run them directly from this checkout using a project `factory.json` with `extends`, or the launcher's `--factory` path. Resource paths resolve from their declaring file. Framework resources use `@factory/` references. See the [tools README](../README.md).

Dependency targets run here with `FACTORY_HOME` pointing to the framework: `make -C /path/to/tools/factories/golang install`. No files need to be copied into the application.
