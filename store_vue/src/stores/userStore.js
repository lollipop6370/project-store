import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from '@/utils/token-utils';
import { userLogin , findUId } from "@/api";

export const useUserStore = defineStore('user', {
    state: () => ({
      userInfo: {
        uid: 1,
        username: 'John Doe',
        isLoggedIn: false,
      },
    }),
    getters:{
      getUserStoreLogin: (state) => {
        return state.userInfo.isLoggedIn;
      },
      getUserStoreToken: (state) => {
        return getToken();
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
        this.userInfo.isLoggedIn = true;
        let result2 = await findUId();
        this.userInfo.uid = result2;
        setToken(result.token);
      },
      userStoreLogout(){
        removeToken();
        this.username = '';
        this.uid = null;
        this.isLoggedIn = false;
      }
    },
});