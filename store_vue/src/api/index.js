
import request from "../utils/request/"

/* 查詢總商品數量 
送給後端-> null
送回前端<- {totalProduct:int}
*/
export const getProductCount = () => {
  return request.get("shop/productCount");
};
/* 查詢所有normal商品  
-> info:{ currentPage:int , pageSize:int } 
<- {id:int,name:String,price:double,image:String,type:int}
*/
export const getNMProduct = (info) => {
  return request.post("shop/nmProductByPage",info);
};
/* 註冊 
-> user:{username:String , email:String , password:String} 
<- null
*/
export const userRegister = (user) => {
  return request.post("user/register",user);
}
/**
 * 註冊時確認username是否被使用
 * -> username:String
 * <- {Boolean}
 */
export const checkUsername = (username) => {
  return request.get("user/register/username",username);
}
/* 登入 
-> user:{username:String , password:String} 
<- {token:String}
*/
export const userLogin = (user) => {
  return request.post("user/login",user);
};
/* 取得用戶購物車項物 
-> uid:int
<- {id:int , image:String , name:String , price:double , quantity:int}
*/
export const getUserCart = (uid) => {
  return request.get("user/cart",uid);
};
/**
 * 更新後端購物車清單
 * -> items:{ id:int , quantity:int }
 * <- null
 */
export const updateBackendCart = (items) => {
  return request.post("user/cart/updateList",items);
};
/**
 * 新增購物車清單
 * -> items:{id:int , quantity:int}
 * <- null
 */
export const newBackendCart = (items) => {
  return request.post("user/cart/newItem",items);
};
/**
 * 刪除購物車商品
 * -> items:{id:int}
 * <- null
 */
export const deleteBackendCart = (itemsId) => {
  return request.post("user/cart/deleteItem",itemsId);
}
