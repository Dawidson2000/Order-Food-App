import { FC, useContext } from "react";
import styled from "styled-components";

import { MealItemForm } from "./MealItemForm";
import { CartContext } from "../../../store/cart-context";

const MealLi = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    
    & div h3 {
        margin: 0 0 0.25rem 0;    
    }
`;

const Description = styled.div`
    font-style: italic;
`;

const Price = styled.div`
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
`;

export interface IMealItem {
    id: string
    name: string,
    description: string,
    price: number,
}

export const MealItem: FC<IMealItem> = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    const cartContext = useContext(CartContext);

    const addToCartHandler = (amount: number) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        });
    };

    return <MealLi>
        <div>
            <h3>{props.name}</h3>
            <Description>{props.description}</Description>
            <Price>{price}</Price>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
        </div>
    </MealLi>
};