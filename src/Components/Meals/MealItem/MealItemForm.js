import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
	const [isValidQty, setIsValidQty] = useState(true);
	const inputQtyRef = useRef();
	const submitHandler = (event) => {
		event.preventDefault();
		const enteredQty = +inputQtyRef.current.value.trim();
		if (enteredQty < 1 || enteredQty > 5) {
			return;
		}
		// console.log(enteredQty);
		props.onAddToCart(enteredQty);
	};

	const inputChangeHandler = (event) => {
		const enteredQty = +inputQtyRef.current.value.trim();
		if (enteredQty < 1 || enteredQty > 5) {
			return setIsValidQty(false);
		}
		setIsValidQty(true);
	};
	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<Input
				ref={inputQtyRef}
				label="Qty"
				input={{
					type: 'number',
					id: 'qty_' + props.id,
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
					onChange: inputChangeHandler,
				}}
			/>
			<button
				className={classes.button}
				type="submit"
				disabled={!isValidQty}
			>
				Add
			</button>
			{false && <p>Please enter a valid Quantity</p>}
		</form>
	);
}

export default MealItemForm;
