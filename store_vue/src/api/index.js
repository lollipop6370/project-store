
import request from "../utils/request/"

/* 查詢總商品數量 
送給後端-> null
送回前端<- {totalProduct:int}
*/
export const getProductCount = () => {
  return request.get("home/productCount");
};
/* 查詢所有normal商品  
-> info:{ currentPage:int , pageSize:int } 
<- {id:int,name:String,price:double,image:String,type:int}
*/
export const getNMProduct = (info) => {
  return request.post("home/nmProductByPage",info);
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
  return request.get("user/register/username",{params:{username:username}});
}
/* 登入 
-> user:{username:String , password:String} 
<- {token:String , uid:int}
*/
export const userLogin = (user) => {
  return request.post("user/login",user);
};
/* 取得用戶購物車項物 
-> uid:int
<- {id:int , image:String , name:String , price:double , quantity:int}
*/
export const getUserCart = (uid) => {
  return request.get("cart",{params:{uid:uid}});
};
/**
 * 更新後端購物車清單(更新現有物品數量)
 * -> token:String (head) , id:int , quantity:int
 * <- null
 */
export const updateBackendCart = (id,quantity) => {
  return request.get("cart/updateList",{params:{id:id,quantity:quantity}});
};
/**
 * 新增購物車清單
 * -> token:String(head) , id:int , count:int
 * <- null
 */
export const newBackendCart = (itemId,count) => {
  return request.get("cart/newItem", {params:{id:itemId, count:count}});
};
/**
 * 刪除購物車商品
 * -> token:String , items:{id:int}
 * <- null
 */
export const deleteBackendCart = (itemId) => {
  return request.get("cart/deleteItem",{params:{id:itemId}});
}
/**
 * 查詢商品詳情
 * -> id:int
 * <- {id:int,name:String,price:double,image:String,type:int}
 */
export const loadProductDetail = (id) => {
  return request.get("home/nmProductByPage/detail",{ params:{id:id} });
}
/**
 * 用token查uid
 * -> token:String (放header就好)
 * <- {uid:int}
 */
export const findUId = () => {
  return request.get("user/uid");
}
/**
 * 檢查是否登入、token是否過期
 * -> token:String (head)
 * <- {isLogin:Boolean}
 */
export const checkLogin = () => {
  return request.get("user/checkLogin");
}
/**
 * 後台登入
 * -> username:String, password:String
 * <- null
 */
export const backendLogin = (username, password) => {
  return request.get("backend/login",{params:{username:username,password:password}});
}