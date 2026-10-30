// Reads and validates the Skills under skills/. The rules mirror what the Firefly host accepts, so a Skill that
// passes here loads in the app without changes.
import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

export const MODES = Object.freeze(["chat", "work", "code"]);
export const EFFECT_KINDS = Object.freeze(["read", "mutation", "verification", "external_side_effect"]);
export const LIMITS = Object.freeze({ descriptionChars: 1024, fileBytes: 512 * 1024, skillBytes: 4 * 1024 * 1024, files: 200 });

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;
// Skills are instructions and references. Anything that runs on its own has no place here.
const EXECUTABLE = /\.(exe|dll|so|dylib|bat|cmd|ps1|psm1|vbs|msi|scr|com|jar|node|wasm)$/i;
const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;

export class SkillError extends Error {
  constructor(skill, code, detail = "") {
    super(`${skill}: ${code}${detail ? ` (${detail})` : ""}`);
    this.skill = skill;
    this.code = code;
  }
}

/** Every file of a Skill, relative and forward-slashed. Links, odd names and case-only duplicates are refused. */
export async function listFiles(root, id) {
  const files = [];
  const seen = new Set();
  async function visit(directory, prefix) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const name = entry.name;
      if (!name || /[\\/:*?"<>|\x00-\x1f]/.test(name) || /[. ]$/.test(name) || RESERVED.test(name)) throw new SkillError(id, "PATH_INVALID", name);
      const relative = prefix ? `${prefix}/${name}` : name;
      if (seen.has(relative.toLowerCase())) throw new SkillError(id, "PATH_DUPLICATE", relative);
      seen.add(relative.toLowerCase());
      const location = path.join(directory, name);
      const info = await fs.lstat(location);
      if (info.isSymbolicLink()) throw new SkillError(id, "LINK_FORBIDDEN", relative);
      if (info.isDirectory()) await visit(location, relative);
      else if (info.isFile()) files.push({ path: relative, size: info.size });
      else throw new SkillError(id, "NOT_A_FILE", relative);
    }
  }
  await visit(root, "");
  return files.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

export function parseFrontmatter(id, text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) throw new SkillError(id, "FRONTMATTER_MISSING");
  let data;
  try {
    data = parse(match[1], { schema: "core", uniqueKeys: true });
  } catch (error) {
    throw new SkillError(id, "FRONTMATTER_INVALID", error.message.split("\n")[0]);
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new SkillError(id, "FRONTMATTER_INVALID");
  return { data, body: text.slice(match[0].length) };
}

/** Validates one Skill directory and returns what the catalog needs. */
export async function readSkill(skillsRoot, id) {
  if (!ID.test(id) || id.length > 64) throw new SkillError(id, "ID_INVALID");
  const root = path.join(skillsRoot, id);
  const files = await listFiles(root, id);
  const names = new Set(files.map(file => file.path));
  for (const required of ["SKILL.md", "LICENSE"]) if (!names.has(required)) throw new SkillError(id, "FILE_MISSING", required);
  if (files.length > LIMITS.files) throw new SkillError(id, "TOO_MANY_FILES");
  let total = 0;
  for (const file of files) {
    if (EXECUTABLE.test(file.path)) throw new SkillError(id, "EXECUTABLE_FORBIDDEN", file.path);
    if (file.size > LIMITS.fileBytes) throw new SkillError(id, "FILE_TOO_LARGE", file.path);
    total += file.size;
  }
  if (total > LIMITS.skillBytes) throw new SkillError(id, "SKILL_TOO_LARGE");

  const { data, body } = parseFrontmatter(id, await fs.readFile(path.join(root, "SKILL.md"), "utf8"));
  if (data.name !== id) throw new SkillError(id, "NAME_MISMATCH", String(data.name));
  if (typeof data.description !== "string" || !data.description.trim()) throw new SkillError(id, "DESCRIPTION_MISSING");
  if ([...data.description].length > LIMITS.descriptionChars) throw new SkillError(id, "DESCRIPTION_TOO_LONG");
  if (typeof data.version !== "string" || !SEMVER.test(data.version)) throw new SkillError(id, "VERSION_INVALID", String(data.version));
  if (data.modes !== undefined) {
    if (!Array.isArray(data.modes) || data.modes.length === 0 || data.modes.some(mode => !MODES.includes(mode)) || new Set(data.modes).size !== data.modes.length) {
      throw new SkillError(id, "MODES_INVALID");
    }
  }
  if (data.effectKind !== undefined && !EFFECT_KINDS.includes(data.effectKind)) throw new SkillError(id, "EFFECT_KIND_INVALID", String(data.effectKind));
  if (data.tools !== undefined && (!Array.isArray(data.tools) || data.tools.some(tool => typeof tool !== "string" || !tool.trim()))) {
    throw new SkillError(id, "TOOLS_INVALID");
  }
  if (!body.trim()) throw new SkillError(id, "BODY_EMPTY");
  return { id, description: data.description.trim(), version: data.version, modes: data.modes ?? [...MODES], files: files.map(file => file.path) };
}

/** All Skills in the repository, sorted by id. */
export async function readSkills(repoRoot) {
  const skillsRoot = path.join(repoRoot, "skills");
  const entries = await fs.readdir(skillsRoot, { withFileTypes: true });
  const ids = entries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  const stray = entries.filter(entry => !entry.isDirectory()).map(entry => entry.name);
  if (stray.length) throw new SkillError("skills", "STRAY_FILES", stray.join(", "));
  return Promise.all(ids.map(id => readSkill(skillsRoot, id)));
}
