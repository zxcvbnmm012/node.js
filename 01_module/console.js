// 01_module/console.js

const { Console } = require("console");
const fs = require("fs");
const express = require("express"); // 외부모듈. -> 웹서버를 만들어주는 모듈

// sample 폴더 하위에 ouput.log 파일생성.
const output = fs.createWriteStream("./sample/output.log", { flags: "a" }); // createWriteStream : 파일 생성
// sample 폴더 하위에 errlog.log 파일생성.
const errlog = fs.createWriteStream("./sample/errlog.log", { flags: "a" });

const logger = new Console({
  stdout: output,
  stderr: errlog,
});

logger.log("로그기록하기.");
logger.error("에러로그기록하기.");
console.log("end ");
