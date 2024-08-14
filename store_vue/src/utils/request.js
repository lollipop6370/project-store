import axios from "axios";
//import NProgress from "nprogress";

// 配置一個axios實例
const service = axios.create({
    baseURL: "/app-dev/",
    timeout: 50000,
  });

// 添加request攔截器
service.interceptors.request.use((config) => {
    //NProgress.start()//開啟進度條
    // 如果有token，通過請求頭傳給後端
    /*const userInfoStore = useUserInfoStore(pinia) 
    const token = userInfoStore.token
       if (token) {
        // config.headers['token'] = token  // 錯誤: header中沒有聲明叫'token'的key
        (config.headers)['token'] = token
      }*/
    return config;
});

// 添加response攔截器
service.interceptors.response.use(
    (response) => {
    //NProgress.done()//關閉進度條
  
      if(response.data.code !== 200){
        // 判斷回傳狀態碼
        if (response.data.code == 501)  return  Promise.reject(ElMessage.error("username錯誤"))
        else if (response.data.code == 503) return  Promise.reject(ElMessage.error("密碼錯誤"))
        else if (response.data.code == 504) return  Promise.reject(ElMessage.error("登入已過期"))
        else if (response.data.code == 505) return  Promise.reject(ElMessage.error("用戶名已被使用"))
      } else {
        return response.data.data; // 200:成功 ，返回數據
      }
    },
    (error) => {
    NProgress.done()//關閉進度條
      return Promise.reject(error.message);
    }
  );
  
  export default service;
  