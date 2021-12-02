import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import useHttp from "../../hooks/use-http";
import { CardHelper } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import { LoadingScreen } from "../UI/LoadingScreen";

const Section = styled.section`
    max-width: 60rem;
    width: 90%;
    margin: 2rem auto;
    animation: meals-appear 1s ease-out forwards;

    & ul {
        list-style: none;
        margin: 0;
        padding: 0;  
    }

    @keyframes meals-appear {
    from {
        opacity: 0;
        transform: translateY(3rem);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

type Meal = {
    id: string,
    name: string,
    description: string,
    price: number,
};

export const AvailableMeals: FC = () => {

    const [meals, setMeals] = useState<Meal[]>([]);

    const { error, isLoading, sendRequest: fetchMeals } = useHttp();

    useEffect(() => {
        const applyMeals = (mealObj: Meal[]) => {
            const loadedMeals: Meal[] = [];

            for (const taskKey in mealObj) {
                loadedMeals.push(
                    {
                        id: taskKey,
                        name: mealObj[taskKey].name,
                        description: mealObj[taskKey].description,
                        price: mealObj[taskKey].price
                    })
            }

            setMeals(loadedMeals);
            console.log(loadedMeals);
        };

        fetchMeals({ url: 'https://react-dummy-http-72feb-default-rtdb.firebaseio.com/meals.json' }, applyMeals)

    }, [fetchMeals])

    const mealsList = meals.map(meal => {
        if (Object.values(meal).every(Boolean)) {
            return <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        }
    })

    let content: any = mealsList;

    if (error) {
        content = <p>Something gone wrong</p>;
    }

    if (isLoading) {
        content = <LoadingScreen />;
    }

    return <Section>
        <ul>
            <CardHelper className>
                {content}
            </CardHelper>
        </ul>
    </Section>
};