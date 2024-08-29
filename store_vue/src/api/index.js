
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
export const updateBackendCart = (pid,quantity) => {
  return request.get("cart/updateList",{params:{pid:pid,quantity:quantity}});
};
/**
 * 新增購物車清單
 * -> token:String(head) , pid:int , count:int
 * <- null
 */
export const newBackendCart = (itemId,count) => {
  return request.get("cart/newItem", {params:{pid:itemId, count:count}});
};
/**
 * 刪除購物車商品
 * -> token:String , items:{id:int}
 * <- null
 */
export const deleteBackendCart = (itemId) => {
  return request.get("cart/deleteItem",{params:{pid:itemId}});
}
/**
 * 查詢商品詳情
 * -> id:int
 * <- {id:int,name:String,price:double,image:String,type:int}
 */
export const loadProductDetail = (pid) => {
  return request.get("home/nmProductByPage/detail",{ params:{pid:pid} });
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
/**
 * 後台讀取所有用戶資訊
 * -> null
 * <- {uid:int, username:String, password:String, email:String}
 */
export const backendUser = (pageInfo) => {
  return request.get("backend/user",{params:{currentPage:pageInfo.currentPage, pageSize:pageInfo.pageSize}});
}
/**
 * 後台編輯用戶
 * -> { uid:int, username:String, password:String, email:String }
 * <- null
 */
export const userEdit = (form) => {
  return request.post("backend/user",form);
}
/**
 * 後台刪除用戶
 * -> uid:int
 * <- null
 */
export const userDel = (uid) => {
  return request.delete("backend/user",{params:{uid:uid}});
}
/**
 * 獲取用戶總數(總頁數)
 * -> pageSize:int
 * <- totalPage:int
 */
export const userPageCount = (pageSize) => {
  return request.get("backend/user/count",{params:{pageSize:pageSize}});
}
/**
 * 獲取後台商品列表
 * -> pageInfo:{currentPage:int, pageSize:int}
 * <- { id:int, name:String, image:String, price:double, type:int }
 */
export const backendProduct = (pageInfo) => {
  return request.get("backend/product",{params:{currentPage:pageInfo.currentPage,pageSize:pageInfo.pageSize}});
}
/**
 * 獲取總商品數
 * -> null
 * <- productCount:int
 */
export const backendProductPage = (pageSize) => {
  return request.get("backend/product/page",{params:{pageSize:pageSize}});
}
/**
 * 編輯商品
 * -> formData:{ id:int, name:String, price:int, type:int, image:string }
 * <- null
 */
export const backendProductEdit = (product) => {
  return request.post("backend/product/edit",product);
}
/**
 * 刪除商品
 * -> id:int
 * <- null
 */
export const backendProductDel = (pid) => {
  return request.delete("backend/product",{params:{pid:pid}});
}
/**
 * 新增商品(圖片)
 * -> { file: MultipartFile}
 * <- null
 */
export const backendProductImg = (file) => {
  return request.post("backend/product/new/img",file);
}