const fs = require("fs");
// 비동기방식 fs.readFile() vs 동기방식 fs.readFileSync()

console.log("start");
// 1. 비동기방식
// fs.readFile("./sample/output.log", "utf8", (err, data) => {
//   // 매개값1. 파일경로, 매개값2. 인코딩, 매개값3. 콜백함수
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// 1. 동기방식
// fs.readFileSync("./sample/output.log", "utf8");
// console.log(data);

fs.writeFile("./sample/write.txt", "글쓰기..", "utf8", (err) => {
  // 예외가 발생하면 콜백함수 (err) 실행.
  if (err) {
    throw err;
  }
  console.log("쓰기완료.");
});

console.log("end");
