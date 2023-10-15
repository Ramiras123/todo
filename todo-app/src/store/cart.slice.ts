import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartItemSlicer {
	id: number;
	title: string;
	date: string;
	text: string;
}

export interface CartState {
	items: CartItemSlicer[];
}

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<CartItemSlicer>) => {
			state.items.push(action.payload);
		}
	}
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
