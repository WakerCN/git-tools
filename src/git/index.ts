import { SimpleGit, SimpleGitOptions, simpleGit } from "simple-git";

export class GitMananger {
  public constructor() {}

  private static sgInstance: SimpleGit;

  public getInstance(): SimpleGit {
    if (!GitMananger.sgInstance) {
      const options: Partial<SimpleGitOptions> = {
        baseDir: process.cwd(),
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false
      };
      GitMananger.sgInstance = simpleGit(options);
    }
    return GitMananger.sgInstance;
  }

  /**
   * 将git stash的文件，进行git commit
   * @param msg 提交信息
   */
  public commit(msg: string) {
    GitMananger.sgInstance.commit(msg);
  }

  /** 判断当前目录是否是git目录 */
  public isGitDir() {}

  /** 展示git信息 */
  public showStatus() {}
}
