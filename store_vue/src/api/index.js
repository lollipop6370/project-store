
import request from "../utils/request/"

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
 * 清空購物車
 * -> token:String
 * <- null
 */
export const clearBackendCart = () => {
  return request.delete("cart/deleteItem");
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
 * -> formData:{ id:int, name:String, price:int, type:int, count:int, image:string }
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
/**
 * 新增訂單
 * -> { uid:int, totalPrice:int, address:String, city:String, postal:int, receiver:String }
 * <- oid:int
 */
export const newOrder = (obj) => {
  return request.post("order",obj);
}
/**
 * 新增訂單中的商品清單
 * -> 數組:[{ oid:int, pid:int, quantity:int }]
 * <- null
 */
export const newOrderItems = (obj) => {
  return request.post("order/items",obj);
}
/**
 * 讀取指定用戶所有訂單
 * -> token:String(head) , pageSize:int
 * <- 數組:[{ oid:int, status:int, price:int, createTime:String }]
 */
export const readOrder = (currentPage, pageSize) => {
  return request.get("order",{params:{currentPage:currentPage,pageSize:pageSize}});
}
/**
 * 讀取指定訂單的詳細資訊
 * -> oid:int
 * <- 數組:[{ name:String, quantity:int, price:int }]
 */
export const getOrderDetail = (oid) => {
  return request.get("order/items",{params:{oid:oid}});
}
/**
 * 後臺管理系統讀取訂單
 * -> { currentPage:int, pageSize:int }
 * <- 數組:[{ oid:int, uid:int, status:int, price:int, createTime:String, address:String, city:String, postal:int, reciver:String }]
 */
export const getBEOrder = (pageInfo) => {
  return request.get("backend/order",{params:{currentPage:pageInfo.currentPage, pageSize:pageInfo.pageSize}});
}
/**
 * 後臺管理系統讀取訂單裡item
 * -> oid:int
 * <- 數組:[{ name:String, quantity:int, price:int }]
 */
export const getBEOrderItems = (oid) => {
  return request.get("backend/order/items",{params:{oid:oid}});
}
/**
 * 後臺管理系統訂單狀態變更
 * -> oid:int , status:int
 * <- null
 */
export const editBEOrderStatus = (oid, status) => {
  return request.put("backend/order",{oid:oid,status:status});
}
/**
 * 查詢訂單總頁數
 * -> pageSize:int
 * <- totalPage:int
 */
export const getBEOrderCount = (pageSize) => {
  return request.get("backend/order/totalPage",{params:{pageSize:pageSize}});
}
/**
 * 查詢指定用戶訂單總頁數
 * -> pageSize:int, token:String(head)
 * <- totalPage:int
 */
export const getOrderPageCount = (pageSize) => {
  return request.get("order/totalPage",{params:{pageSize:pageSize}});
}
/**
 * 讀取所有商品總類
 * -> null
 * <- 數組:[string]
 */
export const getProductType = () => {
  return request.get("home/productType");
}
/**
 * 使用過濾器查詢商品
 * -> type:string, priceRange:int, currentPage:int, pageSize:int
 * <- 數組:[{ pid:int, name:string, price:int, image:String, type:int}]
 */
export const getProductByFilter = (type,priceRange,pageInfo) => {
  return request.get("home/filter",{params:{type:type+'',priceRange:priceRange,currentPage:pageInfo.currentPage,pageSize:pageInfo.pageSize}});
}
/**
 * 使用過濾器查詢商品的數量
 * -> type:string, priceRange:int
 * <- totalPage:int
 */
export const getProductByFilterCount = (type,priceRange,pageSize) => {
  return request.get("home/filterCount",{params:{type:type+'',priceRange:priceRange,pageSize:pageSize}});
}
/**
 * 使用者拉進購物車時，可買商品數量增減
 * -> itemId:int, count:int
 * <- null
 */
export const productCountEdit = (itemId,count) => {
  return request.put("cart/productCount",{pid:itemId,count:count});
}
/**
 * 加密訂單資訊
 * -> order:{ oid:int, totalPrice:int }
 * <- { MerchantID:string, TradeInfo:string, TradeSha:string, Version:string}
 */
export const createPayment = (order) => {
  return request.post("order/createPayment",order);
}
/**
 * 刪除沒付款的訂單
 */
export const delOrder = (oid) => {
  return request.delete("order/noPayOrder",{params:{oid:oid}});
}
/**
 * 獲取商品種類
 * <- 數組:[{tid:int, tname:string}]
 */
export const getTypeName = () => {
  return request.get("backend/product/type");
}
/**
 * 後端管理台刪除訂單
 * -> oid:int
 * <- null
 */
export const backendDelOrder = (oid) => {
  return request.delete("backend/order",{params:{oid:oid}});
}