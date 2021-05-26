import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context.js';
import CartIcon from './CartIcon.js';
import classes from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
	const [btnIsBumpy, setBtnIsBumpy] = useState(false);
	const cartCtx = useContext(CartContext);
	const cartItemCount = cartCtx.items.reduce((current, item) => {
		return current + item.quantity;
	}, 0);

	// const { items } = cartCtx;

	const btnClasses = `${classes.button} ${btnIsBumpy ? classes.bump : ''}`;
	useEffect(() => {
		if (!cartItemCount) return;
		setBtnIsBumpy(true);
		const timer = setTimeout(() => {
			setBtnIsBumpy(false);
		}, 300);

		// CleanUp function
		return () => {
			clearTimeout(timer);
		};
	}, [cartItemCount]);
	return (
		<button onClick={props.onClick} className={btnClasses}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Cart</span>
			<span className={classes.badge}>{cartItemCount}</span>
		</button>
	);
}

export default HeaderCartButton;
