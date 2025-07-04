const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./sql/.env" });
const mysql = require("./sql"); // index.js에 옮긴 mysql 관련 기능들을 import.

// 인스턴스 생성
const app = express();
app.use(bodyParser.json()); // body-parser가 json 포맷을 사용할 수 있도록 함.

// 라우터 정보
app.get("/", (req, res) => {
  // get 방식 요청.
  res.send("Root 경로");
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
