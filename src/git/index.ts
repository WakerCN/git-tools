import * as prompts from "@clack/prompts";
import dedent from "dedent";
import { intersection } from "lodash-es";
import { SimpleGitOptions, SimpleGit, simpleGit } from "simple-git";

const { log } = prompts;

interface SoGitManager {
  commitMsg?: (msg: string) => Promise<void>;
  showStatus?: () => Promise<void>;
}

export class GitMananger {
  public constructor() {}

  /** simpleGit 实例对象 */
  private static sgInstance: SimpleGit;
  /** 本身自己实例对象 */
  private static instance: GitMananger;

  public getInstance(): GitMananger {
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

  /** 判断当前目录是否是git目录 */
  public isGitDir() {}

  /** 展示git信息 */
  public async showStatus() {
    const statusInfo = await GitMananger.sgInstance.status();
    const { staged, created, modified, deleted } = statusInfo;
    // prettier-ignore
    log.message(dedent`
      当前分支: ${statusInfo.current} ahead: ${statusInfo.ahead} behind: ${statusInfo.behind}
      A: ${intersection(staged, created).length}
      M: ${intersection(staged, modified).length}
      D: ${intersection(staged, deleted).length}
    `);
  }
}
