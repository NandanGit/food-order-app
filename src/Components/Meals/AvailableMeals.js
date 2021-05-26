import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const FIREBASE_ENDPOINT =
	'https://food-order-app-data-default-rtdb.firebaseio.com';

const FILE_NAME = 'meals.json';

function AvailableMeals() {
	const [meals, updateMeals] = useState([]);
	const [isMealsLoading, setIsMealsLoading] = useState(false);
	const [httpError, setHttpError] = useState(false);

	useEffect(() => {
		const fetchMeals = async () => {
			setIsMealsLoading(true);
			const response = await fetch(`${FIREBASE_ENDPOINT}/${FILE_NAME}`);
			// console.log(response);
			if (!response.ok) {
				throw new Error('Something went wrong');
			}
			const data = await response.json();
			const mealsArray = [];
			for (const mealId in data) {
				mealsArray.push({
					id: mealId,
					...data[mealId],
				});
			}
			console.log(mealsArray);
			updateMeals(mealsArray);
			setIsMealsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsMealsLoading(false);
			setHttpError(error.message);
			console.log(error.message);
		});
	}, []);

	if (isMealsLoading) {
		return (
			<section className={classes['meals-loading']}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes['meals-error']}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => {
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
			/>
		);
	});

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
}

export default AvailableMeals;
