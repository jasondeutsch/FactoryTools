# Agent bundles

Each bundle owns its role instructions, local skills, scripts and standalone Pi entrypoint. It has no dependency on the Factory framework.

From the application you want to work on:

```sh
/path/to/tools/agents/coder_golang/start.sh --provider <provider> --model <model>
```

`start.sh` loads `agent.md` and the bundle's `skills/` through Pi's native options. It preserves your working directory and forwards arguments unchanged. Pi uses its normal configuration and credentials; additional skills, MCPs and extensions are configured through Pi. The script does not install dependencies or require `FACTORY_HOME`. `AGENT_EXECUTABLE` can select another Pi executable path.

## Factory-managed execution

A factory references the bundle and its entrypoint explicitly:

```json
{
  "name": "coder_golang",
  "path": "../../agents/coder_golang",
  "entrypoint": "start.sh"
}
```

Factory resolves the member configuration and prepares a native Pi profile and complete instructions file. It performs readiness checks and registration, then invokes the entrypoint in the application directory. To request a managed launch, use Factory's `session.ts` or the coordinator's dispatch helper; do not pass `--factory` to the standalone script.

The entrypoint accepts this caller contract:

| Input | Meaning |
| --- | --- |
| Working directory | Application workspace; never changed by the entrypoint. |
| `AGENT_EXECUTABLE` | Pi executable; defaults to `pi`. |
| `AGENT_INSTRUCTIONS_FILE` | Optional complete instructions file. When provided, replaces automatic bundle instruction/skill loading. |
| `PI_CODING_AGENT_DIR` | Optional native Pi profile directory, supplied by the caller. |
| Arguments | Native Pi options and prompt, forwarded unchanged, including session output selection. |

These inputs are not specific to Factory. Any caller can supply them. Factory's profile already contains selected models, tools, MCPs and extensions; the entrypoint does not merge or regenerate it. The complete instructions file already contains the selected role and skills, so the script avoids loading a second copy.

The current entrypoints run Pi. Other runners need their own native entrypoint and configuration; Factory can invoke them using its command-runner interface. A standalone session does not automatically acquire task messaging or background inbox delivery.
