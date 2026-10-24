// Scaffolds skills/<id>/ with SKILL.md, LICENSE and NOTICE.md. usage: npm run new-skill <id>
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function createSkill(repoRoot, id, year = new Date().getFullYear()) {
  if (!ID.test(id ?? "") || id.length > 64) throw new Error("Skill id must be lowercase letters, digits and hyphens, at most 64 characters.");
  const root = path.join(repoRoot, "skills", id);
  await fs.mkdir(path.dirname(root), { recursive: true });
  await fs.mkdir(root, { recursive: false }).catch(error => {
    if (error.code === "EEXIST") throw new Error(`skills/${id} already exists.`);
    throw error;
  });
  const license = (await fs.readFile(path.join(repoRoot, "LICENSE"), "utf8")).replace(/Copyright \(c\) \d{4}/, `Copyright (c) ${year}`);
  await fs.writeFile(path.join(root, "LICENSE"), license);
  await fs.writeFile(path.join(root, "NOTICE.md"), `# ${id}\n\nWho maintains this Skill, where any adapted material comes from, and under which license.\n`);
  await fs.writeFile(path.join(root, "SKILL.md"), `---
name: ${id}
description: 一句话说明什么时候使用这个 Skill，以及什么时候不用。
version: 0.1.0
modes:
  - work
---

# ${id}

写给流萤的步骤与约定：先做什么、需要确认什么、完成后怎样核对结果。
`);
  return root;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const repoRoot = fileURLToPath(new URL("../", import.meta.url));
  try {
    const root = await createSkill(repoRoot, process.argv[2]);
    console.log(`created ${path.relative(repoRoot, root)}; edit SKILL.md, then run npm test and npm run catalog`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
