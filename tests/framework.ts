// Tools integration tests use a separate framework checkout, never vendor it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
export const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const framework = path.resolve(
  process.env.FACTORY_FRAMEWORK_ROOT || path.join(ROOT, "../factory"),
);
if (!fs.existsSync(path.join(framework, "orchestrator/session.ts")))
  throw new Error("Set FACTORY_FRAMEWORK_ROOT to the framework checkout");
const core = await import(
  pathToFileURL(path.join(framework, "orchestrator/lib/core.ts")).href
);
const support = await import(
  pathToFileURL(path.join(framework, "orchestrator/tests/fixture.ts")).href
);
export const json = core.json,
  writeJSON = core.writeJSON,
  sleep = core.sleep;
export const execute = support.execute;
export const fixture = () => support.fixture(ROOT);
export type RecordValue = Record<string, any>;
