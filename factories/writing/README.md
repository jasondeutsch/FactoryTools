# Interactive writing factory

Member names, bundle paths, task owner, and the draft → feedback loop are defined in [factory.json](factory.json). Factory supplies the coordinator, which owns tasks and dispatches the pair writer. Its workflow is authoritative: the pair writer submits a draft, then the human approves it, requests changes, or rejects it. For direct writing without a Factory task, run the pair writer bundle independently.

An existing agent can coordinate this factory by loading Factory's coordinator and task-comms skills, then resolving [factory.json](factory.json). It creates or resumes the task using the operations reference (`$FACTORY_HOME/orchestrator/references/operations.md` in the installed framework) and launches the pair writer in a visible session. The user does not need to run lifecycle commands. Reading role instructions does not automatically apply runner-specific model or tool settings.

Establish the audience, purpose, desired reader action, format, and constraints through conversation. Work with existing material when supplied. For a short edit, edit directly; for a substantial document, discuss its argument or outline before producing a full draft.

Keep the working document in the task directory unless the user names another output path. Use Markdown, self-contained HTML, or an available document tool according to the deliverable. Do not introduce `spec.html` or `plan.html` for writing tasks. Record meaningful decisions, open questions, and source references alongside the draft. Ask before changing a document's central position or adding claims that require evidence.

The writer stays interactive. It can ask the coordinator to arrange a review when technical arguments need one. No extra reviewer is required by the workflow. Sending a message does not grant authority to contact people or publish externally.

When the user is satisfied, record the human approval for the due feedback step, then report the output path and any remaining fact checks. The task reaches completion only after that approval. A change request routes back to the pair writer.

## Dependencies

From the application root:

```bash
make -C /path/to/tools/factories/writing install
make -C /path/to/tools/factories/writing update
```

Installs the shared coordinator tools, including Pi. No additional writing-specific packages are required. Run `update` only when intending to upgrade host tools. Set `FACTORY_HOME` to the separate framework checkout. Docker with Compose and provider credentials remain separate setup; model configuration lives with each agent bundle. See dependency setup (`$FACTORY_HOME/docs/troubleshooting.md#dependency-commands` in the installed framework).
