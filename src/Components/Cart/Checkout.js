import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

function Checkout(props) {
	const nameInputRef = useRef();
	const addressInputRef = useRef();
	const [isInputNameValid, setIsInputNameValid] = useState(true);
	const [isInputAddressValid, setIsInputAddressValid] = useState(true);

	const isEmpty = (value) => value.trim() === '';

	const confirmHandler = (event) => {
		event.preventDefault();
		// Form Validation
		const enteredName = nameInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;

		if (isEmpty(enteredName)) {
			// return console.log('Form is invalid');
			setIsInputNameValid(false);
		} else {
			setIsInputNameValid(true);
		}
		if (isEmpty(enteredAddress)) {
			setIsInputAddressValid(false);
		} else {
			setIsInputAddressValid(true);
		}
		if (!isEmpty(enteredName) && !isEmpty(enteredAddress)) {
			setIsInputAddressValid(true);
			setIsInputNameValid(true);
			console.log({ enteredName, enteredAddress });
		}
	};

	return (
		<form onSubmit={confirmHandler}>
			<div className={classes['inputs-container']}>
				<div
					className={`${classes.control} ${
						!isInputNameValid ? classes.invalid : ''
					}`}
				>
					<label htmlFor="name">Your name</label>
					<input ref={nameInputRef} type="text" id="name" />
					{!isInputNameValid && <p>Invalid Name</p>}
					<div className={classes.actions}>
						<button onClick={props.onClose} type="button">
							Cancel
						</button>
						<button type="submit">Place Order</button>
					</div>
				</div>
				<div
					className={`${classes.control} ${
						!isInputAddressValid ? classes.invalid : ''
					}`}
				>
					<label htmlFor="address">Your Address</label>
					<textarea
						ref={addressInputRef}
						id="address"
						rows="5"
					></textarea>
					{!isInputAddressValid && <p>Invalid Address</p>}
				</div>
			</div>
		</form>
	);
}

export default Checkout;
