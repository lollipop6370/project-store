import { defineStore } from "pinia";

export const useRootStore = defineStore('root', {
    state: () => ({
        rootname: '',
        isLogin: false,
        token: ''
    }),
    actions: {},
    persist:{
        enabled: true,
        strategies: [
            {
              storage: localStorage, // 或者 sessionStorage
              paths: ['rootname', 'isLogin', 'token'],
            },
        ]
    }
});