import * as prompts from "@clack/prompts";
import { log, outro } from "@clack/prompts";
import { Command } from "commander";
import _ from "lodash-es";
import color from "picocolors";
import { GitMananger } from "../../git";
import { TypeInfoList } from "./const";

const commitCommand = new Command();

commitCommand
  .name("commit")
  .alias("c")
  .option("-t, --type", "提交类型")
  .option("-s, --scope", "提交范围")
  .option("-d, --detail", "提交详情")
  .action(commitAction);

async function commitAction(options, command) {
  let gitInstance;
  prompts.intro(`${color.bgCyan(color.bold(" 进入 sogt commit 流程 "))}`);

  try {
    gitInstance = GitMananger.getInstance();
  } catch (error) {
    const dir = color.white(process.cwd());
    return prompts.cancel(color.bold(`Error：当前目录 ${dir} 不是git目录`));
  }

  // ========== git status信息确认 start ========== //
  await gitInstance.showStatus();
  const isConfirm = await prompts.confirm({
    message: "提交详情如上，是否继续提交？"
  });
  if (prompts.isCancel(isConfirm)) {
    prompts.cancel("git commit 已取消");
    process.exit(0);
  }
  if (!isConfirm) {
    return outro(color.bgCyan(" end sogt commit "));
  }
  // =========== git status信息确认 end =========== //

  // ========== 提交形象prompt start ========== //
  const { type, scope, detail } = await prompts.group(
    {
      type: () =>
        prompts.select({
          message: "请选择提交的类型（type）",
          initialValue: "feat",
          options: _.map(TypeInfoList, (t) => ({
            value: t.type,
            label: `${t.emoji} ${t.type}`,
            hint: t.detail
          }))
        }),
      scope: () =>
        prompts.text({
          message: "请填写提交的范围（scope）",
          defaultValue: "",
          placeholder: "scope"
        }),
      detail: () =>
        prompts.text({
          message: "请填写提交的详情（detail）",
          defaultValue: "",
          placeholder: "detail"
        })
    },
    {
      onCancel: (res) => {
        prompts.cancel("git commit 已取消");
        process.exit(0);
      }
    }
  );
  const typeInfo = TypeInfoList.find((t) => t.type === type);
  const commitMsg =
    `${typeInfo.emoji} ${typeInfo.type}` +
    (scope ? ` <${scope}>` : "") +
    (detail ? ` ${detail}` : "");

  log.message(`git commit msg 如下：\n${commitMsg}`);
  // =========== 提交形象prompt end =========== //

  /* 最后进行一遍确认
  =========================================== */
  const { isContinueCommit } = await prompts.group(
    {
      isContinueCommit: () =>
        prompts.confirm({
          message: "是否继续提交?"
        })
    },
    {
      onCancel: (res) => {
        prompts.cancel("git commit 已取消");
        process.exit(0);
      }
    }
  );
  if (!isContinueCommit) {
    return outro(color.bgCyan(" end sogt commit "));
  } else {
    try {
      await gitInstance.commitMsg(commitMsg);
    } catch (error) {
      prompts.cancel("git commit 失败");
      console.log(error);
      process.exit(0);
    }
  }

  outro(color.bgCyan(" end sogt commit "));
}

export default commitCommand;
