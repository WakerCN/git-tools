import * as prompts from "@clack/prompts";
import dedent from "dedent";
import { intersection } from "lodash-es";
import color from "picocolors";
import { SimpleGit, SimpleGitOptions, simpleGit } from "simple-git";
import { isGitCwd } from "../utils/git";

const { log } = prompts;

export class GitMananger {
  public constructor() {}

  /** simpleGit 实例对象 */
  private static sgInstance: SimpleGit;
  /** 本身实例对象 */
  private static instance: GitMananger;

  /** 获取实例的时候初始化sgIntance */
  public static getInstance(): GitMananger {
    if (!isGitCwd()) {
      // throwErrorWithOutStackTrace("当前目录不是git仓库");
      throw new Error("当前目录不是git仓库");
    }

    if (!GitMananger.sgInstance) {
      const options: Partial<SimpleGitOptions> = {
        baseDir: process.cwd(),
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false
      };
      GitMananger.sgInstance = simpleGit(options);
    }
    if (!GitMananger.instance) {
      GitMananger.instance = new GitMananger();
    }
    return GitMananger.instance;
  }

  /**
   * 将git stash的文件，进行git commit
   * @param msg 提交信息
   */
  public async commitMsg(msg: string) {
    GitMananger.sgInstance.commit(msg);
  }

  /** 展示git信息 */
  public async showStatus() {
    const statusInfo = await GitMananger.sgInstance.status();
    const { staged, created, modified, deleted } = statusInfo;
    // prettier-ignore
    log.message(dedent`
      当前分支：${color.green(color.bold(statusInfo.current))}，ahead: ${statusInfo.ahead}，behind: ${statusInfo.behind}
      暂存文件：
      ${color.bold(color.bgGreen(' A 新增 '))} ${intersection(staged, created).length}
      ${color.bold(color.bgYellow(' M 修改 '))} ${intersection(staged, modified).length}
      ${color.bold(color.bgRed(' D 删除 '))} ${intersection(staged, deleted).length}
    `);
  }
}
