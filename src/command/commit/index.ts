import { intro, outro, select, text, spinner, log } from "@clack/prompts";
import * as prompts from "@clack/prompts";
import { Command } from "commander";
import color from "picocolors";
import _ from "lodash-es";
import { TypeInfoList } from "./const";
import { GitMananger } from "../../git";

const commitCommand = new Command();

commitCommand
  .name("commit")
  .alias("c")
  .option("-t, --type", "提交类型")
  .option("-s, --scope", "提交范围")
  .option("-d, --detail", "提交详情")
  .action(commitAction);

async function commitAction(options, command) {
  const gitInstance = new GitMananger().getInstance();
  await gitInstance.showStatus();
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
  log.step(`git commit msg 如下：\n${commitMsg}`);
  const { promptResult } = await prompts.group(
    {
      promptResult: () =>
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
  if (promptResult) {
  }
  outro(color.bgCyan(" end sogt commit "));
}

export default commitCommand;
