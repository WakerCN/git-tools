#! /usr/bin/env node

import { log } from "console";
import { EmojiList } from "./const";

export function sum(a: number, b: number) {
  log("EmojiList", EmojiList);
  return a + b;
}

sum(1, 2);
