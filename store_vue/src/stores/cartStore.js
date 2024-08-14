import { defineStore } from 'pinia';
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
    itemsCount: 0,
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
    async cartStoreAddItem(item) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        //await updateBackendCart(this.items);
      } else {
        this.items.push({ ...item, quantity: 1 });///////須改
        //await newBackendCart(item);
      }
    },
    async cartStoreRemoveItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
      //await deleteBackendCart(itemId);
    },
    async cartStoreClearCart() {
      this.items = [];
      //await updateBackendCart(this.items);
    },
    async cartStoredecrease(itemId){
      const item = this.items.find(item => item.id == itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        //await updateBackendCart(this.items);
      }
    },
    async cartUpdateItems(itemId){
      const item = this.items.find(item => item.id == itemId);
      item.quantity += 1;
      //await updateBackendCart(this.items);
    },
    async cartStoreReload(uid){
      let result = await getUserCart(uid);   //去後端重新載入購物車
      this.items = result.data;
    },
  },
});
