// A Day of One-Line Pitches — one sentence that would convince a friend
// who has never coded to let an AI agent build their first app idea on
// make.fun. Writes the pitch to /output/entry.txt (Node 22, stdlib only).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch: plain words, a concrete reason to say yes now, and the risk
// taken away — no code to write, nothing to pay to enter, the idea stays
// theirs. Built for the kit's sealed judge brief (a plain-spoken editor
// judging on persuasion first, then clarity, truth, warmth and craft).
// It is one sentence; the period inside "make.fun" is part of the name,
// not a sentence break.
const PITCH =
  "Just describe the app idea in your head in plain words, and an AI agent on make.fun will build a working version you can try today — no code to write, nothing to pay to enter, and the idea stays yours.";

// The kit's gate: /output/entry.txt must be UTF-8 text of 1 to 240
// characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 240;

function emptyDir(dir: string): void {
  // Empty only the directory's contents. The grader's /output is a mounted
  // empty directory, so removing the directory itself would fail.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const chars = [...PITCH];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `pitch is ${chars.length} characters, outside the ${MIN_CHARS}–${MAX_CHARS} gate`,
    );
  }
  if (PITCH.includes("\n") || PITCH.trim().length === 0) {
    throw new Error("pitch must be a single non-blank line");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), PITCH + "\n", "utf8");
}

main();
