# Interactive writing factory

Member names, bundle paths, task owner, and the draft → feedback loop are defined in [factory.json](factory.json). Its workflow is authoritative: the pair writer submits a draft, then the human approves it, requests changes, or rejects it. Use `pair_writer` directly for technical documentation, proposals, executive communication, and business writing. Start a coordinator only when delegation or multiple participants would help.

An existing agent can take this role by resolving `pair_writer` from [factory.json](factory.json), then reading that bundle's `agent.md` and configured skills. It creates or resumes the writing task using the operations reference (`$FACTORY_HOME/orchestrator/references/operations.md` in the installed framework); the user does not need to start a separate session or run lifecycle commands. If a dedicated pane is requested, the coordinator prepares it. Reading role instructions does not automatically apply runner-specific model or tool settings.

Establish the audience, purpose, desired reader action, format, and constraints through conversation. Work with existing material when supplied. For a short edit, edit directly; for a substantial document, discuss its argument or outline before producing a full draft.

Keep the working document in the task directory unless the user names another output path. Use Markdown, self-contained HTML, or an available document tool according to the deliverable. Do not introduce `spec.html` or `plan.html` for writing tasks. Record meaningful decisions, open questions, and source references alongside the draft. Ask before changing a document's central position or adding claims that require evidence.

The writer stays interactive. It can ask an available architecture reviewer to examine technical arguments or the coordinator to arrange another review. Neither a second agent nor a review ceremony is mandatory. Sending a message does not grant authority to contact people or publish externally.

When the user is satisfied, record the human approval for the due feedback step, then report the output path and any remaining fact checks. The task reaches completion only after that approval. A change request routes back to the pair writer.

## Dependencies

From the application root:

```bash
make -C /path/to/tools/factories/writing install
make -C /path/to/tools/factories/writing update
```

Installs the shared coordinator tools, including Pi. No additional writing-specific packages are required. Run `update` only when intending to upgrade host tools. Set `FACTORY_HOME` to the separate framework checkout. Docker with Compose and provider credentials remain separate setup; model configuration lives with each agent bundle. See dependency setup (`$FACTORY_HOME/docs/troubleshooting.md#dependency-commands` in the installed framework).
