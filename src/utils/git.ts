import fs from "fs-extra";
import path from "path";

/** 判断process.cwd()是否是git目录 */
export const isGitCwd = (): boolean => {
  return fs.existsSync(path.resolve(process.cwd(), ".git"));
};
