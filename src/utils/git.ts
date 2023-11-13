import cp from "child_process";

/** 判断process.cwd()是否是git目录 */
export const isGitCwd = (): boolean => {
  const result = cp.spawnSync(
    "git",
    ["rev-parse", "--is-inside-work-tree"],
    {
      cwd: process.cwd()
    }
  );
  return result.stdout.toString().trim() === "true";
};
