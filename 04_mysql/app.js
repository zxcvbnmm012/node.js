const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
require("dotenv").config({ path: "./sql/.env" });
const nodemailer = require("./nodemailer");
const mysql = require("./sql"); // index.js에 옮긴 mysql 관련 기능들을 import.

// 인스턴스 생성
const app = express();
app.use(bodyParser.json()); // body-parser가 json 포맷을 사용할 수 있도록 함.

// 라우터 정보
app.get("/", (req, res) => {
  // get 방식 요청.
  res.send("Root 경로");
});

// 엑셀 파일첨부.
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
});

// 이메일 발송 화면 open.
app.get("/excel", (req, res) => {
  // join: 경로들을 합쳐서 페이지를 보여주고 싶을때 사용.
  res.sendFile(path.join(__dirname, "public", "excel.html")); // __dirname: 현재 경로를 가리키는 값.
});

// 첨부처리. 실제 업로드 기능
app.post("/excel", upload.single("myFile"), (req, res) => {
  // 파일이 한개면 single, 파일이 여러개면 array 사용.
  // myFile: file input 태그의 name
  console.log(req.file); // 업로드된 파일의 정보.
  console.log(req.body); // 요청 몸체의 정보.
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`); // upload한 파일명.
  const firstSheetName = workbook.SheetNames[0]; // 엑셀파일의 첫번째 시트.
  // 시트명으로 첫번째 시트 가져오기.
  const firstSheet = workbook.Sheets[firstSheetName];
  // 첫번째 시트의 데이터를 json으로 가져온 값을 객체 형태로 저장.
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  console.log(firstSheetJson);
  // 반복문 활용해서 db에 insert.
  // sort 함수를 사용해서 정렬.
  const fsj = firstSheetJson.sort((a, b) => {
    return a.name < b.name; // 오름차순: a.name - b.name < 0
  });
  // 정렬된 배열을 사용해 반복.
  fsj.forEach(async (element) => {
    let result = await mysql.query("customerInsert", element);
  });

  // forEach문에서 async/await를 사용하면 기다리는 동작을 수행하지 않을 확률이 있음.
  // 비동기처리를 사용하려면 for문으로 반복문을 사용하는 것이 더 효과적.
  // async function insertAll() {
  //   for (const element of fsj) {
  //     let result = await mysql.query("customerInsert", element);
  //     console.log(result);
  //   }
  // }
  // insertAll(); // 실제로 호출해줘야 실행됨

  if (!req.file) {
    res.send("excel 처리만 가능함");
  } else {
    res.send("업로드 완료");
  }
});

// mysql에 있는 테이블을 엑셀파일로 만들어 uploads에 저장하기.
app.get("/files", async (req, res) => {
  try {
    // 1. MySQL에서 customers 테이블 데이터 조회
    const result = await mysql.query("customerList");
    if (!result || result.length === 0) {
      return res.send("데이터가 없습니다.");
    }
    // 2. 엑셀 워크북/시트 생성
    const wb = xlsx.utils.book_new(); // 새 워크북
    // xlsx 모듈의 utils 객체 안에 있는 book_new() 함수를 사용해 새로운 워크북(엑셀파일전체) 생성.
    const ws = xlsx.utils.json_to_sheet(result); // JSON → 시트
    xlsx.utils.book_append_sheet(wb, ws, "Customers"); // 시트 추가
    // 3. 저장 경로 지정
    const filePath = path.join(__dirname, "uploads", "customers.xlsx");
    // 4. 워크북 저장
    xlsx.writeFile(wb, filePath);
    // 5. 사용자에게 응답
    res.send("엑셀파일 생성완료: customers.xlsx");
  } catch (err) {
    console.error("엑셀 생성 오류:", err);
  }
});

// 이메일 전송.
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.json({ retCode: "success", retVal: result });
  } catch (err) {
    res.json({ retCode: "fail" });
  }
});

// 조회.
app.get("/customers", async (req, res) => {
  // get 방식 요청.
  try {
    let result = await mysql.query("customerList"); // key값에 맞는 쿼리문을 실행하는 함수.
    res.send(result);
  } catch (err) {
    res.send("에러발생 => ", err);
  }
});

// listen(포트, 함수) : 서버를 열어줌
app.listen(3000, () => {
  console.log("http://localhost:3000 running...!!!");
});

// 추가.
// post 방식 : body에 json 정보를 담아서 넘김. -> body-parse 모듈이 body에 담긴 정보를 해석해서 사용
app.post("/customer", async (req, res) => {
  try {
    console.log(req.body.param); // postman에서 넣은 param 값.
    let data = req.body.param; // body 정보에 json 포맷을 넘김.
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    res.send("에러발생 => ", err);
  }
});

// 수정.
app.put("/customer", async (req, res) => {
  try {
    let data = req.body.param;
    let result = await mysql.query("customerUpdate", data);
    res.send(result);
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

// 삭제.
// delete는 경로에 전달하고 싶은 값을 넘김.
// http://localhost:3000/customer/8
app.delete("/customer/:id/:name", async (req, res) => {
  // 여러 파라미터를 전달하는 방법.
  // 1) http://localhost:3000/customer?id=8&name=hong
  // 2) http://localhost:3000/customer/8/hong
  try {
    console.log(req.params);
    let { id } = req.params; // 객체타입의 id 정의 -> {id: 8}
    let result = await mysql.query("customerDelete", id);
    res.send(result);
  } catch (err) {
    res.send("에러발생 => ", err);
  }
});

// pool.query("select * from customers", (err, result) => {
//   if (err) {
//     console.log("처리중 에러", err);
//   } else {
//     console.log(result);
//   }
// });

// let data = ["강백호", "kang@gmail.com", "010-4444-4444", ""];
// pool.query(
//   "insert into customers (name, email, phone, address) values (?,?,?,?)",
//   data,
//   (err, result) => {
//     if (err) {
//       console.log("처리중 에러", err);
//     } else {
//       console.log(result);
//     }
//   }
// );

// let data = ["강백호", "kang@gmail.com", "010-4444-4444", ""];
// data = {
//   name: "username",
//   email: "user@email.com",
//   phone: "010-0101-0101",
//   address: "",
// };
// pool.query("insert into customers set ?", data, (err, result) => {
//   if (err) {
//     console.log("처리중 에러", err);
//   } else {
//     console.log(result);
//   }
// });

// let data = ["강백호", "kang@gmail.com", "010-4444-4444", ""];
// data = [
//   {
//     name: "username",
//     email: "user@email.com",
//     phone: "010-0101-0101",
//     address: "",
//   },
//   1,
// ];
// pool.query("update customers set ? where id = ?", data, (err, result) => {
//   if (err) {
//     console.log("처리중 에러", err);
//   } else {
//     console.log(result);
//   }
// });

// let data = ["강백호", "kang@gmail.com", "010-4444-4444", ""];
// data = 5;
// pool.query("delete from customers where id = 5", (err, result) => {
//   if (err) {
//     console.log("처리중 에러", err);
//   } else {
//     console.log(result);
//   }
// });

// customerSql.js에서 적은 sql문을 활용.
// function query(alias, values) {
//   pool.query(custSql[alias], values, (err, result) => {
//     if (err) {
//       console.log("처리중 에러", err);
//     } else {
//       console.log(result);
//     }
//   });
// }

// query("customerInsert", {
//   name: "홍길동",
//   email: "hong@email.com",
//   phone: "010-0000-0000",
//   address: "",
// });

// query("customerDelete", "6");

// query("customerUpdate", [
//   {
//     name: "김시욱",
//   },
//   4,
// ]);

// query("customerList");
