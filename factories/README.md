# Factories

`golang` and `writing` are team configurations used by the separate Factory framework. Each directory contains `factory.json`, a Markdown recipe and its specialized resources. Worker bundles live in the root `agents/` directory; factory configurations reference them with paths such as `../../agents/coder_golang`.

Run them directly from this checkout using a project `factory.json` with `extends`, or the launcher's `--factory` path. Resource paths resolve from their declaring file. Framework resources use `@factory/` references. See the [tools README](../README.md).

Dependency targets run here with `FACTORY_HOME` pointing to the framework: `make -C /path/to/tools/factories/golang install`. No files need to be copied into the application.
