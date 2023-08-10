#! /usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json";

/** 程序入口 */
function main() {
  const program = new Command();

  program
    .name("sogt")
    .version(pkg.version, "-v, --version", "版本号")
    .helpOption("-h, --help", "帮助中心");

  program
    .option("-c, --commit", "进行 git commmit")
    .option("-t, --tag", "进行 git tag")
    .option("-p, --push", "进行 git push");

  program.parse(process.argv);
}

export default main();
