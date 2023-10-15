export type IsValid = {
	title: boolean;
	text: boolean;
	date: boolean;
};
export type IsValues = {
	title?: string;
	date?: string;
	text?: string;
	id?: number;
	tag?: string;
};
export type StateCart = {
	isValid: IsValid;
	values: IsValues;
	isFormReadyToSubmit: boolean;
};

export type Action = {
	payload?: IsValues;
	type: 'SET_VALUE' | 'CLEAR' | 'RESET_VALIDITY' | 'SUBMIT';
};
export const INITIAL_STATE: StateCart = {
	isValid: {
		title: true,
		text: true,
		date: true
	},
	values: {
		title: '',
		text: '',
		date: '',
		tag: '',
		id: -1
	},
	isFormReadyToSubmit: false
};

export function formReduce(state: StateCart, action: Action): StateCart {
	switch (action.type) {
	case 'SET_VALUE':
		return { ...state, values: { ...state.values, ...action.payload } };
	case 'CLEAR':
		return {
			...state,
			values: INITIAL_STATE.values,
			isFormReadyToSubmit: false
		};
	case 'RESET_VALIDITY':
		return { ...state, isValid: INITIAL_STATE.isValid };
	case 'SUBMIT': {
		const textValidity = state.values.text?.trim().length;
		const titleValidity = state.values.title?.trim().length;
		const dateValidity = state.values.date;
		return {
			...state,
			isValid: {
				title: titleValidity ? true : false,
				text: textValidity ? true : false,
				date: dateValidity ? true : false
			},
			isFormReadyToSubmit: titleValidity && textValidity && dateValidity ? true : false
		};
	}
	}
}
