import { useContext, useState, Fragment } from 'react';
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
	const [isSubmittingLoader, setIsSubmittingLoader] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
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
		// console.log(orderDetails);

		// Send the orderDetails to the backend
		const config = {
			method: 'POST',
			headers: {},
			body: JSON.stringify(orderDetails),
		};
		setIsSubmittingLoader(true);
		await fetch(`${FIREBASE_ENDPOINT}/${FILE_NAME}`, config);
		setIsSubmittingLoader(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartModalContent = (
		<Fragment>
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
		</Fragment>
	);

	const submittingModalContent = <p>Sending Your Order.....</p>;
	const submittedModalContent = (
		<Fragment>
			<p>Your order is Placed</p>
			<div className={classes.actions}>
				<button onClick={props.onClose} className={classes.button}>
					Close
				</button>
			</div>
		</Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmittingLoader && !didSubmit && cartModalContent}
			{isSubmittingLoader && submittingModalContent}
			{!isSubmittingLoader && didSubmit && submittedModalContent}
		</Modal>
	);
}

export default Cart;
