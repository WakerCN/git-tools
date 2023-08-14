import { Command } from "commander";
import { log } from "console";

const tagCommand = new Command();

tagCommand.name("tag").action((options, command) => {
  log("🚩 tag 标签功能仍在开发中...，敬请期待！");
});

export default tagCommand;
