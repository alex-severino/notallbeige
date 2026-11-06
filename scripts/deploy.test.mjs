import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { activeDirectReleases, isLiveCommit, matchingGitBuilds, pickServingDomain, uncoveredLocalFiles } from "./deploy.mjs";

const sha = "current-commit";
const job = {
  uid: "git-job",
  source: "git",
  target: "production",
  readyState: "BUILDING",
  meta: { githubCommitSha: sha, githubCommitRef: "main" },
};

test("only cancel pending Git production builds of the exact main commit", () => {
  const others = [
    { ...job, source: "cli" },
    { ...job, target: "preview" },
    { ...job, target: null },
    { ...job, meta: { ...job.meta, githubCommitSha: "another-commit" } },
    { ...job, meta: { ...job.meta, githubCommitRef: "feature" } },
    ...["READY", "ERROR", "CANCELED"].map((readyState) => ({ ...job, readyState })),
    { ...job, meta: undefined },
  ];
  assert.deepEqual(matchingGitBuilds([job, ...others], sha), [job]);
});

test("queued and initializing duplicates are cancelled before occupying the build slot", () => {
  for (const state of ["INITIALIZING", "QUEUED", "BUILDING"]) {
    const candidate = { ...job, readyState: undefined, state };
    assert.deepEqual(matchingGitBuilds([candidate], sha), [candidate]);
  }
});

test("a direct release already running for the commit blocks a second one", () => {
  const direct = { ...job, source: "cli", meta: { ...job.meta, notallbeigeVerifiedCommit: sha } };
  assert.deepEqual(activeDirectReleases([direct, job], sha), [direct]);
  assert.deepEqual(activeDirectReleases([{ ...direct, readyState: "READY" }], sha), []);
  assert.deepEqual(activeDirectReleases([direct], "another-commit"), []);
});

test("a pending project target must not count as a live release", () => {
  assert.equal(isLiveCommit(job, sha), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY" }, "another-commit"), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY", meta: undefined }, sha), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY" }, sha), true);
});

test("CLI deployments count as live only with the verified-commit marker", () => {
  const cli = { ...job, source: "cli", readyState: "READY" };
  // An older CLI deploy can contain uncommitted files with the same Git SHA.
  assert.equal(isLiveCommit(cli, sha), false);
  assert.equal(isLiveCommit({ ...cli, meta: { ...job.meta, notallbeigeVerifiedCommit: "another-commit" } }, sha), false);
  assert.equal(isLiveCommit({ ...cli, readyState: "BUILDING", meta: {
    ...job.meta, notallbeigeVerifiedCommit: sha,
  } }, sha), false);
  assert.equal(isLiveCommit({ ...cli, meta: { ...job.meta, notallbeigeVerifiedCommit: sha } }, sha), true);
});

test("a project with nothing deployed yet is not live", () => {
  assert.equal(isLiveCommit(null, sha), false);
});

test("the custom domain is used only once it reaches Vercel", () => {
  const aliases = ["www.notallbeige.com", "notallbeige.vercel.app", "notallbeige-team.vercel.app"];
  assert.equal(pickServingDomain(true, aliases), "www.notallbeige.com");
  assert.equal(pickServingDomain(false, aliases), "notallbeige.vercel.app");
  assert.equal(pickServingDomain(false, []), undefined);
});

test(".vercelignore keeps local-only files out without dropping site assets", async () => {
  const rules = (await readFile(new URL("../.vercelignore", import.meta.url), "utf8"))
    .split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  const localOnly = [
    ".claude/", ".next/", ".vercel/", "node_modules/", "next-env.d.ts", ".env", ".env.production",
    ".DS_Store", "public/images/.DS_Store", "tsconfig.tsbuildinfo",
  ];
  assert.deepEqual(uncoveredLocalFiles(localOnly, rules), []);
  const siteFiles = [
    "app/fonts/PPMori-Black.woff2", "public/images/angelina-severino.png", "public/brand/notallbeige-line.svg",
    "components/home/Hero.tsx", "package.json", "next.config.ts",
  ];
  assert.deepEqual(uncoveredLocalFiles(siteFiles, rules), siteFiles);
  assert.deepEqual(uncoveredLocalFiles(["notes/draft.txt"], rules), ["notes/draft.txt"]);
});
