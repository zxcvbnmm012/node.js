const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");
const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");

const app = express(); // 인스턴스 생성
app.use(express.json());

app.listen(3000, () => {
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

// 다운로드
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`; // d:dev/git/node/05_project
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath)) {
    res.send("파일이 없습니다.");
  }
  fs.createReadStream(filepath).pipe(res); // pipe: 최종 목적지에 앞에서 만든 스트림을 복사해줌.
  res.send("다운로드 완료");
});

app.post("/api/:alias", async (req, res) => {
  // localhost:3000/api/productList
  // alias에 실행할 쿼리 지정.
  console.log(req.params.alias);
  console.log(req.body.param);
  console.log(req.params.where);
  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
