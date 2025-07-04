module.exports = {
  // key: value
  // key 값을 넣어주면 key에 담긴 쿼리를 반환해줌.
  customerList: "select * from customers",
  customerInsert: "insert into customers set ?", // mysql에서만 적용되는 insert문.
  customerUpdate: "update customers set ? where id = ?",
  customerDelete: "delete from customers where id = ?",
};
