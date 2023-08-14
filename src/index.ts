#! /usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json";
import commitCommand from "./command/commit";
import pushCommand from "./command/push";
import tagCommand from "./command/tag";

/** 程序入口 */
function main() {
  const program = new Command();

  /* 主命令
   ************************************************/
  program
    .name("sogt")
    .version(pkg.version, "-v, --version", "版本号")
    .helpOption("-h, --help", "帮助中心");

  program
    .addCommand(commitCommand)
    .addCommand(pushCommand)
    .addCommand(tagCommand);

  program.parse(process.argv);
}

export default main();
