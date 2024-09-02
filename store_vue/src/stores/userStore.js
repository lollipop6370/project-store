import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from '@/utils/token-utils';
import { userLogin , checkLogin } from "@/api";

export const useUserStore = defineStore('user', {
    state: () => ({
      userInfo: {
        uid: 1,
        username: 'John Doe',
        isLoggedIn: false,
        token:getToken(),
      },
    }),
    getters:{
      getUserStoreLogin: (state) => {
        return state.userInfo.isLoggedIn;
      },
      getUserStoreToken: (state) => {
        return state.userInfo.token;
      },
      getUsername: (state) => {
        return state.userInfo.username;
      },
      getUserId: (state) => {
        return state.userInfo.uid;
      },
    },
    actions: {
      async userStoreLogin(user) {
        let result = await userLogin(user);
        this.userInfo.token = result.token;
        setToken(result.token);
        this.userInfo.isLoggedIn = true;
        //console.log(result);
        //let result2 = await findUId();
        this.userInfo.uid = result.uid;
        this.userInfo.username = result.username;
      },
      async userStoreLogout(){
        this.userInfo.isLoggedIn = false;
        this.userInfo.username = "";
        this.userInfo.uid = null;
        this.userInfo.token = "";
        removeToken();
        //alert("logout")
      },
      async userStoreCheckLogin(){
         let check = await checkLogin();
         if(check === false){
            removeToken();
         }
         this.userInfo.isLoggedIn = check;
      },
    }
});