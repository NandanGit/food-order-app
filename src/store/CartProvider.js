import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 };

function cartReducer(state, action) {
	if (action.type === 'ADD_ITEM') {
		const item = action.payload.item;
		const updatedTotalAmount =
			state.totalAmount + item.price * item.quantity;

		const existingCartItemIndex = state.items.findIndex(
			(elem) => item.id === elem.id
		);
		// console.log(existingCartItemIndex);
		let updatedItems;
		if (existingCartItemIndex >= 0) {
			const existingCartItem = state.items[existingCartItemIndex];
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity + item.quantity,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	} else if (action.type === 'REMOVE_ITEM') {
		const itemId = action.payload.id;
		const existingCartItemIndex = state.items.findIndex(
			(elem) => elem.id === itemId
		);
		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;
		let updatedItems;
		if (existingCartItem.quantity === 1) {
			// Remove the entire item from the array
			updatedItems = state.items.filter((elem) => elem.id !== itemId);
		} else {
			// Decrese the count
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	} else if (action.type === 'CLEAR_CART') {
		return defaultCartState;
	}
	return defaultCartState;
}

function CartProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD_ITEM', payload: { item } });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE_ITEM', payload: { id } });
	};

	const clearCartHandler = () => {
		dispatchCartAction({ type: 'CLEAR_CART' });
	};

	const cartContextHelper = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	};
	return (
		<CartContext.Provider value={cartContextHelper}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartProvider;
