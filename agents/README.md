# Agent bundles

Every team agent lives under `agents/<name>/`. A bundle owns its role instructions (`agent.md`), standalone entrypoint (`start.sh`), native Pi profile (`pi/settings.json`, `pi/models.json`, `pi/mcp.json`), and links in `skills/`. Skill source files live once under the repository's root `skills/` directory; each agent's `skills/` entries are relative symlinks to the skills it uses. Add a skill by linking it there, rather than copying it into a factory configuration.

From an application directory, launch an agent independently of Factory:

```sh
/path/to/factory-tools/agents/coder_golang/start.sh "Help me with this Go change"
```

The entrypoint copies its Pi profile into `~/.factory/agents/<agent>.<unique-id>/`, selects its own provider/model/tools/MCPs/extensions, loads `agent.md` and linked skills, and preserves the application working directory. Set `FACTORY_AGENT_RUNTIME_DIR` to place those private profiles elsewhere. It needs Pi and any enabled external tools installed. The example profiles use [DeepSeek V4 Flash on OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash), with `OPENROUTER_API_KEY` supplied by the environment. Edit the agent's Pi files to use another provider; do not put credentials in the repository. Optional Linear connections are declared but disabled. Standalone Comms is enabled for the coordinator and disabled for other agents until configured. Go agents enable gopls, so install it before launching them.

Factory-managed sessions also start from these bundle files. Factory reads the native profile and linked skills, prepares a private profile, enables its task Comms connection and delivery adapter, then calls `start.sh` with `AGENT_INSTRUCTIONS_FILE` and `PI_CODING_AGENT_DIR`. The entrypoint uses those prepared inputs without loading its standalone instructions again. The factory file identifies members, handoff rules and workflow behavior; a member `config` can override `provider` and `model` when needed. A custom provider override also needs its provider definition in the factory `providers` map. The framework's built-in coordinator is its fallback when no team factory is selected; team factories here reference `agents/coordinator`.

Ralph's package belongs to the coder's `pi/settings.json`. The Go workflow's `build.loop` setting is a step launch rule: it sets the bounded prompt, approval artifacts and command checks. It does not define the coder's provider, skills or extension package.
