const members = [
  { id: "guest", name: "손님" },
  { id: "user", name: "회원" },
  { id: "admin", name: "관리자" },
];

// function add(num1, num2) {
//   return num1 + num2;
// }

let add = (num1, num2) => num1 + num2; // 화살표 함수 만들기

let getPerson = () => {
  return {
    firstName: "John",
    lastName: "Doe",
    age: 37,
    email: "john@email.com",
  };
};

module.exports = { members, add, getPerson }; // module의 exports 속성에 members라는 값을 저장 -> 다른 파일에서 그 속성을 사용할 수 있음
