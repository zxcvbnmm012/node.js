const { members, add, getPerson } = require("./data.js"); // import : data.js에 정의된 속성을 사용

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

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2]; // 배열 요소를 펼처서 새로운 배열을 만들어줌. -> 펼침연산자 사용 ...
let result1 = [arr1, arr2];
console.log(...arr1);
console.log(result); // [ 1, 2, 3, 4, 5, 6 ]
console.log(result1); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]

// Object Destructuring
let { firstName, lastName, email } = getPerson(); // getPerson()이 반환하는 object의 속성값을 각각의 변수에 담아줌.
console.log(firstName, lastName, email);

// Array Destructuring
function getScores() {
  return [70, 80, 90, 50, 60, 40];
}

let [x, y, ...z] = getScores(); // x = 70, y = 80, z = [90, 50, 60, 40]
console.log(x, y, z);

function sumAry(ary = []) {
  // ary 라는 배열을 매개값으로 받는 함수.
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}

sumAry(z);

function sumAry(...ary) {
  // 매개값의 개수를 알 수 없을 때 ... 사용
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}

sumAry(1, 2, 3, 4, 5);
