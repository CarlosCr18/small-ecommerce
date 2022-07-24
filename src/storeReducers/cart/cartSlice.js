import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			if (
				state.value.filter(
					(value) => value.product_id == action.payload.product_id
				).length > 0
			) {
				state.value = state.value.map((value) => {
					if (value.product_id == action.payload.product_id) {
						return action.payload;
					}
					return value;
				});
			} else {
				state.value = [...state.value, action.payload].sort(
					(value1, value2) => value1.product_id - value2.product_id
				);
			}
		},
		deleteItem: (state, action) => {
			state.value = state.value.filter(
				(element) => element.product_id !== action.payload.product_id
			);
		},
		clearItems: (state, action) => {
			state.value = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, deleteItem, clearItems } = cartSlice.actions;

export const cartArray = (state) => state.cart.value;

export default cartSlice.reducer;
