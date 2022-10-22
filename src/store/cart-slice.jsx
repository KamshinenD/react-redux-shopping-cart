import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuanity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === newItem.id
      );
      state.totalQuanity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      console.log('button clicked')
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const itemToBeRemoved = state.items.find((item) => item.id === id);
      state.totalQuanity--;
      if (itemToBeRemoved.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        itemToBeRemoved.quantity--;
        itemToBeRemoved.totalPrice = itemToBeRemoved.totalPrice - itemToBeRemoved.price
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;