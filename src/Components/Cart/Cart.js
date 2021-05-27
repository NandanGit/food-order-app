import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const FIREBASE_ENDPOINT =
	'https://food-order-app-data-default-rtdb.firebaseio.com';

const FILE_NAME = 'orders.json';

function Cart(props) {
	const [isCheckout, setIsCheckout] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = cartCtx.totalAmount;
	// console.log(totalAmount);
	const hasItems = cartCtx.items.length > 0;
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, quantity: 1 });
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const cartItems = cartCtx.items.map((item) => (
		<CartItem
			key={item.id}
			value={item.name}
			qty={item.quantity}
			price={item.price}
			name={item.name}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	const modalActions = (
		<div className={classes.actions}>
			<button onClick={props.onClose} className={classes['button--alt']}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const placeOrderHandler = async (userData) => {
		const orderDetails = {
			userData,
			cartItems: cartCtx.items,
			orderTotal: cartCtx.totalAmount,
		};
		console.log(orderDetails);

		// Send the orderDetails to the backend
		const config = {
			method: 'POST',
			headers: {},
			body: JSON.stringify(orderDetails),
		};
		fetch(`${FIREBASE_ENDPOINT}/${FILE_NAME}`, config);
	};

	return (
		<Modal onClose={props.onClose}>
			<ul className={classes['cart-items']}>{cartItems}</ul>
			<div className={classes.total}>
				<span>{'Total Amount'}</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onClose={props.onClose}
					onPlaceOrder={placeOrderHandler}
				/>
			)}
			{!isCheckout && modalActions}
		</Modal>
	);
}

export default Cart;
