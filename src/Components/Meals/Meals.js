import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';
import { Fragment } from 'react';

function Meals(props) {
	return (
		<Fragment>
			<MealsSummary />
			<AvailableMeals />
		</Fragment>
	);
}

export default Meals;
