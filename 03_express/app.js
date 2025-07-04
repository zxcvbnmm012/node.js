const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path"); // 내장모듈.
const cors = require("cors");
// customer.js, product.js에서 export한 모듈정보를 import.
const customerRoute = require("./routes/customer");
const productRoute = require("./routes/product");

const app = express(); // express 서버의 instance 생성.
//application/json 요청.
app.use(bodyParser.json());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 파일업로드. multer.
// 저장경로와 파일명 지정.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(): 콜백함수.
    // 저장경로. -> 03_empress/uploads에 저장함.
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // 업로드 파일명.
    // 시간정보를 추가해 파일명이 중복되지 않도록 함.
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8"); // 한글파일명 처리.
    cb(null, Date.now() + "_" + fn); // date.now() : 현재시간
  },
});

// Multer 인스턴스 생성.
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    // image 형태가 아니면 파일업로드 막기.
    const mimetype = /jpg|jped|png|gif/.test(file.mimetype); // 파일의 mimetype 속성에 이미지 확장자 키워드가 있는지 체크.
    if (mimetype) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

// 동일출처 원칙. 모든 서버에서의 요청 허락
app.use(cors());

// 라우팅. p117
app.get("/", (req, res) => {
  // express 서버의 인스턴스인 app에 get 방식으로 요청이 들어왔을때 url이 "/" 패턴이면 함수 실행.
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    // 첫번째 매개값: 파일 경로, 두번째: 인코딩 방식
    if (err) {
      // res: 응답정보.
      res.send(err); // send: 웹페이지에 출력할 구문 만들어줌.
    }
    res.send(data);
  });
});

// 첨부파일 업로드 화면.
// get 방식 요청으로 upload가 들어오면 페이지를 하나 열어줌.
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf-8", (err, data) => {
    // 첫번째 매개값: 파일 경로, 두번째: 인코딩 방식
    if (err) {
      // res: 응답정보.
      res.send(err); // send: 웹페이지에 출력할 구문 만들어줌.
    }
    res.send(data);
  });
});

// express에서 에러처리하는 미들웨어.
app.use((err, req, res, next) => {
  console.log(err, req, res);
  next();
});

// 첨부처리. 실제 업로드 기능
app.post("/upload", upload.array("myFile"), (req, res) => {
  // 파일이 한개면 single, 파일이 여러개면 array 사용.
  // myFile: file input 태그의 name
  console.log(req.files); // 업로드된 파일의 정보.
  console.log(req.body); // 요청 몸체의 정보.
  if (!req.files) {
    res.send("이미지 처리만 가능함");
  } else {
    res.send("업로드 완료");
  }
});

// 동일출처원칙.
app.get("/getCors", (req, res) => {
  let result = { id: "user01", name: "Hong" };
  res.json(result);
});

// app.get("/customer", (req, res) => {
//   res.send("/customer 경로입니다.");
// });

// app.post("/customer", (req, res) => {
//   // res.send("/customer 경로의 post 요청입니다.");
//   res.json({ id: 10, name: "hongkildong" });
// });

// bodyParser를 활용해서 요청정보의 body 정보를 해석.
app.post("/json-data", (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  console.log(req.body.name);

  res.send("json 요청");
});

app.post("/form-data", (req, res) => {
  console.log(req.body);

  res.send("form-data 요청");
});

// 라우팅 정보를 파일로 분리.
app.use("/customer", customerRoute); // customer의 하위에 라우트 정보가 있음. http://localhost:3000/customer/customers
app.use("/product", productRoute);

app.listen(3000, () => {
  // 포트지정: 3000, 콜백함수: () -> 정상적으로 실행되면 콜백함수에 저장된 메세지 보여줌.
  console.log("http://localhost:3000 서버실행.");
});
