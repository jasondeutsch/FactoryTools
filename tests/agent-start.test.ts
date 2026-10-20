import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT, execute, fixture, writeJSON } from "./framework.ts";

function fakePi(file: string) {
  fs.writeFileSync(
    file,
    `#!${process.execPath}
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
if (args[0] === 'auth') console.log(JSON.stringify({status:'ready'}));
else if (args[0] === 'mcp') console.log(JSON.stringify({servers:[{name:'comms',state:'connected'}]}));
else if (args.includes('rpc')) console.log(JSON.stringify({id:'factory-startup',data:{commands:[{name:'factory-inbox'}]}}));
else {
 const instructions = args[args.indexOf('--append-system-prompt') + 1];
 console.log(JSON.stringify({args,cwd:process.cwd(),instructions:fs.readFileSync(instructions,'utf8'),profile:process.env.PI_CODING_AGENT_DIR,executable:process.env.AGENT_EXECUTABLE}));
}
`,
    { mode: 0o700 },
  );
}

test("each agent starts without Factory and passes native Pi options unchanged", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "standalone-agents-"));
  const executable = path.join(root, "fake pi.cjs");
  fakePi(executable);
  const env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) =>
        !key.startsWith("FACTORY_") &&
        !key.startsWith("AGENT_") &&
        !key.startsWith("PI_"),
    ),
  );
  try {
    for (const name of [
      "architect",
      "architecture_reviewer",
      "coder_golang",
      "code_reviewer_golang",
      "pair_writer",
    ]) {
      const directory = path.join(ROOT, "agents", name);
      const output = JSON.parse(
        (
          await execute(
            path.join(directory, "start.sh"),
            ["--model", "test-model", "A request with spaces"],
            { cwd: root, env: { ...env, AGENT_EXECUTABLE: executable } },
          )
        ).stdout,
      );
      assert.equal(output.cwd, fs.realpathSync(root));
      assert.equal(output.profile, undefined);
      assert.equal(
        output.instructions,
        fs.readFileSync(path.join(directory, "agent.md"), "utf8"),
      );
      assert.ok(output.args.includes(path.join(directory, "skills")));
      assert.deepEqual(output.args.slice(-3), [
        "--model",
        "test-model",
        "A request with spaces",
      ]);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Factory invokes the agent entrypoint with one prepared profile and complete instructions", async () => {
  const f = await fixture();
  try {
    const executable = path.join(f.root, "fake pi.cjs");
    fakePi(executable);
    writeJSON(path.join(f.project, "factory.json"), {
      extends: path.join(f.content, "factories/writing/factory.json"),
      defaults: { executable },
    });
    const output = JSON.parse(
      (await f.cli("orchestrator/session.ts", ["pair_writer"])).stdout,
    );
    assert.equal(output.cwd, f.project);
    assert.equal(output.executable, executable);
    assert.ok(output.profile.startsWith(f.env.FACTORY_RUNTIME_DIR));
    assert.ok(output.instructions.includes("# Factory session"));
    assert.ok(output.instructions.includes("# Pair writer"));
    assert.ok(output.instructions.includes("task-comms"));
    assert.ok(output.instructions.includes("technical-writing"));
    assert.equal(
      output.args.filter((arg: string) => arg === "--append-system-prompt")
        .length,
      1,
    );
    assert.ok(!output.args.includes("--skill"));
    assert.ok(output.args.includes("--session"));
  } finally {
    await f.close();
  }
});
