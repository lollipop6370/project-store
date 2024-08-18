import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { getUserCart , updateBackendCart , newBackendCart , deleteBackendCart } from '@/api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [{
      id: 5,
      image: 'path-to-image1.jpg',
      name: 'T Shirt For Men',
      price: 130.0,
      quantity: 1,
    },
    {
      id: 3,
      image: 'path-to-image2.jpg',
      name: 'Red Scarf For Women',
      price: 120.5,
      quantity: 1,
    }],
    itemsCount: 2,
  }),
  getters: {
    cartStoreTotalPrice: (state) => {  //購物車所有商品價格總和
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    cartStoreTotalItemsCount: (state) => {  //購物車的總數量
      return state.itemsCount;
    },
    cartStoreTotalItems: (state) => {
      return state.items;
    },
  },
  actions: {
    async cartStoreAddItem(itemId) {
      const existingItem = this.items.find(i => i.id === itemId);
      console.log("測試點5");
      console.log(this.items);
      if (existingItem) {  //購物車已有該商品
        console.log("測試點4");
        existingItem.quantity += 1;
        console.log("測試點1:");
  console.log(existingItem.id,existingItem.quantity);
        await updateBackendCart(existingItem.id,existingItem.quantity);
        console.log("測試點2");
  console.log(existingItem.id,existingItem.quantity);
      } else {  //購物車沒有該商品
        console.log("測試點3");
        this.itemsCount += 1;  //購物車新品+1
        //this.items.push(item);
        //await newBackendCart(item);
      }
    },
    async cartStoreRemoveItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
      //await deleteBackendCart(itemId);
    },
    async cartStoreClearCart() {
      //await updateBackendCart(this.items);
      this.items = [];
      this.itemsCount = 0;
    },
    async cartStoredecrease(itemId){
      const item = this.items.find(item => item.id == itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        //await updateBackendCart(this.items);
      }
    },
    async cartUpdateItems(itemId){////////////////////////////////////////
      const item = this.items.find(item => item.id == itemId);
      item.quantity += 1;
      //await updateBackendCart(this.items);
    },
    async cartStoreReload(){
      let userStore = useUserStore();
      let uid = userStore.getUserId;
      //console.log("reload1");
      console.log(userStore.getUserStoreToken);
      let result = await getUserCart(uid);   //去後端重新載入購物車
      //console.log("reload2");
      //console.log(result);
      this.itemsCount = result.length;
      this.items = result;
    },
  },
});
