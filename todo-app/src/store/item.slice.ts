import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItemSlicer {
	id?: number;
	title?: string;
	date?: string;
	text?: string;
}

export interface CartState {
	item: CartItemSlicer;
}

const initialState: CartState = {
	item: {
		title: '',
		text: '',
		date: '',
		id: -1
	}
};

export const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		createCart: (state, action: PayloadAction<CartItemSlicer>) => {
			console.log(action.payload);
			state.item = {
				...state.item,
				...action.payload
			};
		},
		clear: (state) => {
			state.item = {
				...initialState.item
			};
		}
	}
});

export default itemSlice.reducer;
export const itemAction = itemSlice.actions;
