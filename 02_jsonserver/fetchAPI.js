// 추가.
async function json_func() {
  try {
    let promise = await fetch("http://localhost:3000/posts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "5", title: "fetch연습", author: "admin" }),
    });
    let resolve = await promise.json(); // 결과를 json 함수를 통해 자바스크립트의 객체타입으로 변환.
    console.log("결과=>", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json();
    console.log("결과=>", resolve);
  } catch (err) {
    console.log(err);
  }
}

json_func();

// 수정.
async function json_func() {
  try {
    let promise = await fetch("http://localhost:3000/posts/2", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "2", title: "수정연습", author: "admin" }),
    });
    let resolve = await promise.json(); // 결과를 json 함수를 통해 자바스크립트의 객체타입으로 변환.
    console.log("결과=>", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json();
    console.log("결과=>", resolve);
  } catch (err) {
    console.log(err);
  }
}

json_func();

// 삭제.
// fetch("http://localhost:3000/posts/2", {
//   method: "delete",
// })
//   .then((resolve) => resolve.text())
//   .then((result) => {
//     console.log("삭제결과=>", result);
//     return fetch("http://localhost:3000/posts/3");
//   })
//   .then((resolve) => resolve.json())
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

async function delete_func() {
  try {
    const deleteRes = await fetch("http://localhost:3000/posts/2", {
      method: "DELETE",
    });
    const deleteResult = await deleteRes.text(); // 주석 코드와 맞춤
    console.log("삭제결과=>", deleteResult);

    const getRes = await fetch("http://localhost:3000/posts/3");
    const getResult = await getRes.json();
    console.log("결과=>", getResult);
  } catch (err) {
    console.error("에러 발생:", err);
  }
}

delete_func();
