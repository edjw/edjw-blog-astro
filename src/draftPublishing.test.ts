import { afterAll, beforeAll, describe, expect, test } from "vite-plus/test";
import { execFile } from "node:child_process";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const draftSlug = "2026-08-02-choosing-a-creative-commons-licence-for-shapenote-music";
const draftTitle = "Choosing a Creative Commons licence for shapenote music";

let temporaryDirectory: string;
let outputDirectory: URL;

beforeAll(async () => {
  temporaryDirectory = await mkdtemp(join(process.cwd(), ".draft-build-"));
  const temporaryRoot = pathToFileURL(`${temporaryDirectory}/`);
  outputDirectory = new URL("dist/", temporaryRoot);

  const buildEnvironment = {
    HOME: process.env.HOME,
    NODE_ENV: "production",
    PATH: process.env.PATH,
  };

  await execFileAsync("vp", ["run", "build", "--force", "--outDir", outputDirectory.pathname], {
    cwd: process.cwd(),
    env: buildEnvironment,
  });
}, 120_000);

afterAll(async () => {
  await rm(temporaryDirectory, { recursive: true, force: true });
});

describe("draft publishing", () => {
  test("keeps drafts out of the production site", async () => {
    const blogIndex = await readFile(new URL("blog/index.html", outputDirectory), "utf8");
    const rssFeed = await readFile(new URL("rss.xml", outputDirectory), "utf8");

    expect(blogIndex).not.toContain(draftTitle);
    expect(rssFeed).not.toContain(draftTitle);
    await expect(
      access(new URL(`blog/${draftSlug}/index.html`, outputDirectory)),
    ).rejects.toThrow();
  });
});
