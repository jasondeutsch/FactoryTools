import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fixture, json, execute } from "./framework.ts";

test("external tools load with the external framework with valid member entrypoints, skills and task templates", async () => {
  const installed = await fixture();
  try {
    for (const factory of ["golang", "writing"]) {
      const definition = json(
        path.join(installed.content, "factories", factory, "factory.json"),
      );
      for (const member of definition.agents) {
        const result = await installed.cli("orchestrator/session.ts", [
          member.name,
          "--factory",
          factory,
          "--dry-run",
        ]);
        const preview = JSON.parse(result.stdout);
        assert.equal(preview.role, member.name);
        if (member.name !== "coordinator")
          assert.equal(
            preview.command[0],
            path.resolve(
              installed.content,
              "factories",
              factory,
              member.path,
              "start.sh",
            ),
          );
        assert.ok(preview.skills.length > 0);
        assert.ok(
          !preview.skills.some((name: string) => name.includes("/resources/")),
        );
      }
      const directory = (
        await installed.cli("orchestrator/scripts/task.ts", [
          "new",
          "--factory",
          factory,
          "--name",
          factory + " task",
          "--brief",
          "Installation check only",
        ])
      ).stdout.trim();
      assert.equal(
        fs.existsSync(path.join(directory, "spec.html")),
        factory === "golang",
      );
      assert.equal(
        fs.existsSync(path.join(directory, "plan.html")),
        factory === "golang",
      );
      if (factory === "golang") {
        await installed.cli("orchestrator/scripts/task.ts", [
          "decide",
          directory,
          "--by",
          "human",
          "--outcome",
          "approve",
          "--artifact",
          "spec.html",
          "--artifact",
          "plan.html",
          "--text",
          "Fixture approval",
        ]);
        const preview = JSON.parse(
          (
            await installed.cli("orchestrator/session.ts", [
              "coder_golang",
              directory,
              "--loop",
              "2",
              "--dry-run",
            ])
          ).stdout,
        );
        assert.ok(
          preview.command.at(-1).startsWith("/ralph-loop --max-iterations=2"),
        );
      }
    }
    assert.deepEqual(fs.readdirSync(installed.project), []);
  } finally {
    await installed.close();
  }
});
