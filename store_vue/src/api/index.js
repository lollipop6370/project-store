import request from "../utils/request/"

/* 查詢總商品數量 */
export const getProductCount = () => {
  return request.get("shop/productCount");
};
/* 查詢所有normal商品  info:{ currentPage:int , pageSize:int } */
export const getNMProduct = (info) => {
  return request.post("shop/nmProductByPage",info);
};
/* 登入 user:{username:String , password:String} */
export const userLogin = (user) => {
  return request.post("user/login",user);
};

