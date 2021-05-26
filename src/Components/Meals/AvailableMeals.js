import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
    {
        id: "m1",
        name: "Sushi",
        description: "Finest fish and veggies",
        price: 1699,
    },
    {
        id: "m2",
        name: "Schnitzel",
        description: "A german specialty!",
        price: 1199,
    },
    {
        id: "m3",
        name: "Barbecue Burger",
        description: "American, raw, meaty",
        price: 899,
    },
    {
        id: "m4",
        name: "Green Bowl",
        description: "Healthy...and green...",
        price: 1399,
    },
];

function AvailableMeals() {
    const mealsList = DUMMY_MEALS.map((meal) => {
        return (
            <MealItem
                key = {meal.id}
                id = {meal.id}
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
