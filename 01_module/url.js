const url = new URL(
  "https://user:pass@sum.example.com:8080/a/b/c?query=name&num=1#node"
);
console.log(url); // 각각의 속성들을 분리해서 보여줌.

const params = url.searchParams;
console.log(params); // 각각의 속성들을 분리해서 보여줌.
console.log(params.get("query")); // 파라미터에 담긴 값을 반환.
console.log(params.get("num")); // 파라미터에 담긴 값을 반환.
