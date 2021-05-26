import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

function Cart(props) {
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

	const cartItems = cartCtx.items.map((item) => (
		<CartItem
			key={item.id}
			value={item.name}
			qty={item.quantity}
			price={item.price}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	return (
		<Modal onClose={props.onClose}>
			<ul className={classes['cart-items']}>{cartItems}</ul>
			<div className={classes.total}>
				<span>{'Total Amount'}</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button
					onClick={props.onClose}
					className={classes['button--alt']}
				>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
}

export default Cart;
