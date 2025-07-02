const { members, add } = require("./data.js"); // import : data.js에 정의된 속성을 사용

console.log("hello.world");
let myName = "홍길동";
let age = 20;

if (age >= 20) {
  console.log(`${myName} 성인`); // ``(백틱) 안에서 ${}를 사용해 변수 사용하기 가능.
} else {
  console.log("미성인");
}

console.log(members);
console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) {
    // index가 0보다 큰 값일때만 출력.
    console.log(item);
  }
}); // forEach는 함수가 매개값: function(item, idx, array)
