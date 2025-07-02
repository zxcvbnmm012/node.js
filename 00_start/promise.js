// promise.js

// 프로미스 객체 호출
const promise = new Promise(function (resolve, reject) {
  // 반환해주는 결과값에 따라 정상적으로 실행됐을 때 resolve, 에러 났을 때 reject
  let run = parseInt(Math.random() * 2);
  // falsy => 0, null, "", undefined 이외에는 truthy.
  setTimeout(function () {
    if (run) {
      resolve({ id: "user", name: "회원" });
    } else {
      reject(new Error("에러호출"));
    }
  }, 1000); // setTimeout의 첫번째 매개값: function, 두번째 매개값: 지연시간
});

promise //
  .then(function (result) {
    // resolve 메소드에 담긴 값을 받아옴.
    // promise 객체의 함수가 정상적으로 실행된다면 .then
    console.log(result);
  })
  .catch(function (err) {
    // reject 메소드에 담긴 값을 받아옴.
    // promise 객체의 함수가 실패하면 .catch
    console.log(err); // 1초 있다가 error 출력.
  });

// ajax call.
fetch(
  "https://charleslee-6617723.postman.co/workspace/3461b914-2d4f-41c9-8c64-f24308da11f5/request/45560951-edf6f244-dc04-42e6-a962-02a67c0332d1?action=share&source=copy-link&creator=45560951&ctx=documentation"
) //
  .then((json) => json.json()) //
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
