import { configureStore } from '@reduxjs/toolkit';
import cartSlice, { CART_PERSISTENT_STATE } from './cart.slice';
import { saveState } from './storage';
import itemSlice from './item.slice';

export const store = configureStore({
	reducer: {
		cart: cartSlice,
		item: itemSlice
	}
});

store.subscribe(() => {
	saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
