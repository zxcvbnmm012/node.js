const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");
const path = require("path");
const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");

const app = express(); // 인스턴스 생성

// 업로드 경로 확인.
let uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.json({ limit: "10mb" }));

app.listen(3000, () => {
  // 3000포트를 사용하겠다.
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

app.get("/fileupload", (req, res) => {
  // sendFile: 특정위치에 있는 파일을 열어줌.
  // path.join: path 모듈의 join 메소드 -> 매개값으로 들어오는 경로들을 조합해서 하나의 경로를 만들어줌.
  // -> d:/dev/git/node/05_project/mysql/public/index.html
  res.sendFile(path.join(__dirname, "public", "index.html"));
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

// 업로드.
app.post("/upload/:filename/:pid", (req, res) => {
  const { filename, pid } = req.params; // axios에서 객체타입으로 값을 넘김
  // const filePath = `${__dirname}/uploads/${filename}/${pid}`; // .../05_project/uploads/sample.jpg
  // req.body.data 요청정보의 body의 data라는 속성을 읽어옴. -> axios가 body에 값을 담아서 넘김.

  let productDir = path.join(uploadDir, pid); // uploads 폴더 아래에 pid 번호 폴더 만들기.
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir); // uploads/pid 폴더가 없으면 mkdirSync를 이용해서 폴더를 만든다.
  }

  const safeFilename = path.basename(filename); // 경로공격 대응
  // 업로드경로 uploadDir를 먼저 만들어놓고 상품아이디, 파일이름을 붙여서 파일을 저장.
  const filePath = path.join(uploadDir, pid, safeFilename);
  let data = req.body.data.slice(req.body.data.indexOf(";base64,") + 8); // result에서 ;base64, 이후의 값을 data에 저장
  // + 8 : ;base64, 의 인덱스 값 이후의 값을 잘라오기 위해 더해줌.
  fs.writeFile(filePath, data, "base64", (err) => {
    if (err) {
      res.send("error");
    } else {
      res.send("success");
    }
  }); // file 생성.
});

// 데이터 쿼리.
app.post("/api/:alias", async (req, res) => {
  // localhost:3000/api/productList
  // alias에 실행할 쿼리 지정.
  console.log(req.params.alias);
  console.log(req.body.param);
  console.log(req.params.where);
  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
