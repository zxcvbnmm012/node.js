const path = require("path");

console.log(__filename); // 파일 경로.
console.log(path.basename(__filename)); // 현재 파일 이름.
console.log(path.basename(__filename, ".js")); // 확장자 제외한 파일 이름.

// 각각의 속성들을 조합해 하나의 경로 만들기 : format
let result = path.format({
  base: "sample.txt",
  dir: "/home/temp",
});

console.log(result);

// 경로를 각각의 속성들로 분해하기 : parse
result = path.parse("/home/temp/sample.txt");
console.log(result);
