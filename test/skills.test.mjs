import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { readSkill, readSkills } from "../tools/skills.mjs";
import { buildCatalog, CATALOG_PATH } from "../tools/catalog.mjs";
import { createSkill } from "../tools/new-skill.mjs";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

async function fixture(files) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "firefly-skills-"));
  for (const [name, content] of Object.entries(files)) {
    await fs.mkdir(path.dirname(path.join(root, name)), { recursive: true });
    await fs.writeFile(path.join(root, name), content);
  }
  return root;
}
const skill = (front, body = "Steps.\n") => `---\n${front}\n---\n${body}`;
const good = "name: demo\ndescription: When to use it.\nversion: 1.0.0\nmodes: [work]";

test("every Skill in the repository passes validation", async () => {
  const skills = await readSkills(repoRoot);
  assert.ok(skills.length > 0);
  for (const item of skills) assert.ok(item.files.includes("SKILL.md") && item.files.includes("LICENSE"), item.id);
});

test("the committed catalog matches skills/", async () => {
  const committed = (await fs.readFile(path.join(repoRoot, CATALOG_PATH), "utf8")).replace(/\r\n/g, "\n");
  assert.equal(committed, await buildCatalog(repoRoot));
});

// Firefly treats the catalog's package root ("./") as a plugin. These root
// paths are plugin components there and block every Skill from installing.
const PLUGIN_COMPONENT_PATHS = ["commands", "agents", "hooks", "bin", "scripts", "workflows", "output-styles", "themes", "monitors",
  ".lsp.json", "settings.json", "CLAUDE.md", ".app.json", "mcp.json", ".mcp.json"];

test("the repository root has no plugin component paths", async () => {
  const present = (await fs.readdir(repoRoot)).filter(name => PLUGIN_COMPONENT_PATHS.includes(name));
  assert.deepEqual(present, []);
});

test("a valid Skill reads back its id, version and modes", async () => {
  const root = await fixture({ "demo/SKILL.md": skill(good), "demo/LICENSE": "MIT" });
  assert.deepEqual(await readSkill(root, "demo"), { id: "demo", description: "When to use it.", version: "1.0.0", modes: ["work"], files: ["LICENSE", "SKILL.md"] });
});

for (const [name, front, code] of [
  ["a name that differs from the folder", good.replace("name: demo", "name: other"), "NAME_MISMATCH"],
  ["a missing description", good.replace("description: When to use it.", "description: \"\""), "DESCRIPTION_MISSING"],
  ["a description over 1024 characters", good.replace("When to use it.", "x".repeat(1025)), "DESCRIPTION_TOO_LONG"],
  ["a version that is not SemVer", good.replace("1.0.0", "v1"), "VERSION_INVALID"],
  ["an unknown mode", good.replace("[work]", "[work, play]"), "MODES_INVALID"],
  ["an unknown effect kind", `${good}\neffectKind: delete-everything`, "EFFECT_KIND_INVALID"],
  ["duplicate keys", `${good}\nname: demo`, "FRONTMATTER_INVALID"],
]) {
  test(`rejects ${name}`, async () => {
    const root = await fixture({ "demo/SKILL.md": skill(front), "demo/LICENSE": "MIT" });
    await assert.rejects(readSkill(root, "demo"), { code });
  });
}

test("rejects a Skill without a license", async () => {
  const root = await fixture({ "demo/SKILL.md": skill(good) });
  await assert.rejects(readSkill(root, "demo"), { code: "FILE_MISSING" });
});

test("rejects executables and oversized files", async () => {
  const exe = await fixture({ "demo/SKILL.md": skill(good), "demo/LICENSE": "MIT", "demo/tools/run.ps1": "Remove-Item" });
  await assert.rejects(readSkill(exe, "demo"), { code: "EXECUTABLE_FORBIDDEN" });
  const big = await fixture({ "demo/SKILL.md": skill(good), "demo/LICENSE": "MIT", "demo/references/huge.md": "x".repeat(512 * 1024 + 1) });
  await assert.rejects(readSkill(big, "demo"), { code: "FILE_TOO_LARGE" });
});

test("rejects an empty body and an id that is not kebab-case", async () => {
  const empty = await fixture({ "demo/SKILL.md": skill(good, "\n"), "demo/LICENSE": "MIT" });
  await assert.rejects(readSkill(empty, "demo"), { code: "BODY_EMPTY" });
  await assert.rejects(readSkill(empty, "Demo_Skill"), { code: "ID_INVALID" });
});

test("new-skill scaffolds a Skill that passes validation and refuses to overwrite", async () => {
  const root = await fixture({ LICENSE: "MIT License\n\nCopyright (c) 2026 Firefly-0423\n" });
  await createSkill(root, "trip-planner", 2027);
  const read = await readSkill(path.join(root, "skills"), "trip-planner");
  assert.equal(read.version, "0.1.0");
  assert.match(await fs.readFile(path.join(root, "skills/trip-planner/LICENSE"), "utf8"), /Copyright \(c\) 2027 Firefly-0423/);
  await assert.rejects(createSkill(root, "trip-planner"), /already exists/);
  await assert.rejects(createSkill(root, "Trip Planner"), /lowercase/);
});
