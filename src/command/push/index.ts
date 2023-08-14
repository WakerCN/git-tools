import { Command } from "commander";
import { log } from "console";

const pushCommand = new Command();

pushCommand.name("push").action((options, command) => {
  log("😺 push 推送功能仍在开发中...，敬请期待！");
});

export default pushCommand;
