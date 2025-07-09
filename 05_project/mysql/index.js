// mysql과 관련된 기능

const mysql = require("mysql2");
const sql = require("./product");

// 환경변수
const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});

// console.log(sql["productList"].query);

// product.js에서 적은 sql문을 활용.
async function query(alias, values = [], where = "") {
  return new Promise((resolve, reject) => {
    console.log(sql[alias].query + where);
    // sql[alias].query + where: 쿼리문, values: 등록(전달)할 값, (err, result): 콜백함수
    pool.query(sql[alias].query + where, values, (err, result) => {
      if (err) {
        console.log("처리중 에러", err);
        reject(err); // 에러가 발생하면 reject 함수에 err를 전달해줌.
      } else {
        resolve(result); // 정상적으로 실행되면 resolve 함수에 처리결과를 전달해줌.
      }
    });
  });
} // end of query().

module.exports = { query };
