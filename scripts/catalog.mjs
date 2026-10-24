// Writes .claude-plugin/marketplace.json from skills/, or with --check fails when the committed catalog is out of date.
// The layout follows the anthropics/skills marketplace, which the Firefly host already knows how to read.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readSkills } from "./skills.mjs";

export const CATALOG_PATH = ".claude-plugin/marketplace.json";

export async function buildCatalog(repoRoot) {
  const skills = await readSkills(repoRoot);
  const catalog = {
    name: "firefly-skills",
    owner: { name: "Firefly-0423", url: "https://github.com/Firefly-0423" },
    metadata: { description: "Skills for Firefly, reviewed and kept as plain instructions and references.", version: "1.0.0" },
    plugins: [{
      name: "firefly-skills",
      description: "All Skills in this repository.",
      source: "./",
      strict: false,
      skills: skills.map(skill => `./skills/${skill.id}`),
    }],
  };
  return `${JSON.stringify(catalog, null, 2)}\n`;
}

async function main() {
  const repoRoot = fileURLToPath(new URL("../", import.meta.url));
  const expected = await buildCatalog(repoRoot);
  const target = path.join(repoRoot, CATALOG_PATH);
  if (process.argv.includes("--check")) {
    const actual = await fs.readFile(target, "utf8").catch(() => "");
    if (actual.replace(/\r\n/g, "\n") !== expected) {
      console.error(`${CATALOG_PATH} is out of date; run npm run catalog and commit the result.`);
      process.exit(1);
    }
    console.log(`${CATALOG_PATH} matches skills/.`);
    return;
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, expected);
  console.log(`wrote ${CATALOG_PATH}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
