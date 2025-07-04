// express 모듈 전체 기능을 import.
const express = require("express"); // express 모듈 전체를 가져와서
const router = express.Router(); // 내장된 라우터 클래스를 사용함.

// express 모듈에서 라우터 기능만 import.
// const {router} = require("express");
// const router = Router();

// 라우팅 정보.
router.get("/products", (req, res) => {
  res.send("/product 루트디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/product POST 요청.");
});

router.put("/update", (req, res) => {
  res.send("/product PUT 요청.");
});

router.delete("/delete", (req, res) => {
  res.send("/product DELETE 요청.");
});

module.exports = router;
