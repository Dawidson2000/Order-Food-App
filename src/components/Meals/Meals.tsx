import { FC } from "react";
import styled from "styled-components";

import { AvailableMeals } from "./AvailableMeals";
import { MealsSummary } from "./MealsSummary";

export const Meals: FC = () => {
    return <>
        <MealsSummary />
        <AvailableMeals />
    </>
};