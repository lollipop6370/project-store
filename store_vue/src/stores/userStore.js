import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from '@/utils/token-utils';
import { userLogin } from "@/api";

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
    },
    actions: {
      async userStoreLogin(user) {
        let result = await userLogin(user);
        this.userInfo.isLoggedIn = true;
        setToken(result.token);
      },
      userStoreLogout(){
        removeToken();
        this.username = '';
        this.isLoggedIn = false;
      }
    },
});