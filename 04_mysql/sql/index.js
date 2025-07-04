// mysql과 관련된 기능을 app.js에서 index.js로 옮겨옴.

const mysql = require("mysql2");
const custSql = require("./customerSql");

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});

// customerSql.js에서 적은 sql문을 활용.
async function query(alias, values) {
  return new Promise((resolve, reject) => {
    pool.query(custSql[alias], values, (err, result) => {
      if (err) {
        console.log("처리중 에러", err);
        reject(err); // 에러가 발생하면 reject 함수에 err를 전달해줌.
      } else {
        console.log(result);
        resolve(result); // 정상적으로 실행되면 resolve 함수에 처리결과를 전달해줌.
      }
    });
  });
} // end of query().

module.exports = { query };
