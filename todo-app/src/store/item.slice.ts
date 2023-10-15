import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CART_PERSISTENT_STATE = 'cartData';

export interface ItemSlicer {
	id?: number;
	title?: string;
	date?: string;
	text?: string;
}
export interface ItemValidate {
	title: boolean;
	date: boolean;
	text: boolean;
}

export type isReady = boolean;
export interface CartState {
	item: ItemSlicer;
	validate: ItemValidate;
	isReadySubmit: isReady;
}

const initialState: CartState = {
	item: {
		title: '',
		text: '',
		date: '',
		id: -1
	},
	validate: {
		title: true,
		date: true,
		text: true
	},
	isReadySubmit: false
};

export const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		createCart: (state, action: PayloadAction<ItemSlicer>) => {
			state.item = {
				...state.item,
				...action.payload
			};
		},
		clear: (state) => {
			state.item = {
				...initialState.item
			};
			state.validate = {
				...initialState.validate
			};
			state.isReadySubmit = false;
		},
		updateValidate: (state, action: PayloadAction<ItemValidate>) => {
			state.validate = {
				...action.payload
			};
			if (state.validate.date && state.validate.text && state.validate.title) {
				state.isReadySubmit = true;
			}
		},
		clearValidate: (state) => {
			state.validate = {
				...initialState.validate
			};
			state.isReadySubmit = false;
		}
	}
});

export default itemSlice.reducer;
export const itemAction = itemSlice.actions;
