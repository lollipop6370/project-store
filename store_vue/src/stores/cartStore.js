import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { getUserCart , updateBackendCart , newBackendCart , deleteBackendCart , clearBackendCart , productCountEdit } from '@/api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [{
      pid: 5,
      image: 'path-to-image1.jpg',
      name: 'T Shirt For Men',
      price: 130.0,
      quantity: 1,
    },
    {
      pid: 3,
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
    async cartStoreAddItem(itemId,count) {   // 什麼商品(itemId)，買了count個
      const existingItem = this.items.find(i => i.pid === parseInt(itemId));
      if (existingItem) {  //購物車已有該商品
        existingItem.quantity += count;
        await updateBackendCart(existingItem.pid,existingItem.quantity);
      } else {  //購物車沒有該商品
        this.itemsCount += 1;  //購物車新品+1
        this.items.push({pid: parseInt(itemId),quantity: count});
        await newBackendCart(itemId,count);
      }
      await productCountEdit(itemId,count);
    },
    async cartStoreRemoveItem(itemId , quantity) {
      await productCountEdit(itemId, -quantity);
      this.items = this.items.filter(item => item.pid !== itemId);
      await deleteBackendCart(itemId);
      this.itemsCount -= 1;
    },
    async cartStoreClearCart() {
      await clearBackendCart();
      this.items = [];
      this.itemsCount = 0;
    },
    async cartStoredecrease(itemId){
      const existingItem = this.items.find(item => item.pid == itemId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        await updateBackendCart(existingItem.pid,existingItem.quantity);
      }
      else if (existingItem && existingItem.quantity === 1){
        this.items = this.items.filter(item => item.pid !== itemId);
        await deleteBackendCart(existingItem.pid);
        this.itemsCount -= 1;
      }
      await productCountEdit(itemId, -1);
    },
    async cartStoreReload(){
      let userStore = useUserStore();
      let uid = userStore.getUserId;
      let result = await getUserCart(uid);   //去後端重新載入購物車
      this.itemsCount = result.length;
      this.items = result;
    },
  },
});
