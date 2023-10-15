import { CartItemSlicer } from './cart.slice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItemSlicer {
	id: number;
	title: string;
	date: string;
	text: string;
}

export interface CartState {
	items: CartItemSlicer[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<CartItemSlicer>) => {
			const cart = state.items.find((item) => item.id === action.payload.id);
			if (cart) {
				state.items.map((item) => {
					if (action.payload.id === item.id) {
						item.date = action.payload.date;
						item.text = action.payload.text;
						item.title = action.payload.title;
					}
					return item;
				});
			} else {
				state.items.push(action.payload);
			}
		},
		delete: (state, action: PayloadAction<number>) => {
			console.log(action.payload);
			state.items = state.items.filter((item) => item.id !== action.payload);
		}
	}
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
