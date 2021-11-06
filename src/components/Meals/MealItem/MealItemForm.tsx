import React, { FC, useRef, useState } from "react";
import styled from "styled-components";

import { Input } from "../../UI/Input";

const MealForm = styled.form`
    text-align: right; 
    
    & button {
        font: inherit;
        cursor: pointer;
        background-color: #8a2b06;
        border: 1px solid #8a2b06;
        color: white;
        padding: 0.25rem 2rem;
        border-radius: 20px;
        font-weight: bold;

        &:hover, &:active {
            background-color: #641e03;
            border-color: #641e03;
        } 
    }
`;

export interface IMealItemForm {
    id: string,
    onAddToCart: (amount: number) => void
}

export const MealItemForm: FC<IMealItemForm> = (props) => {
    const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
    
    const amountInputRef = useRef<HTMLInputElement>();

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current?.value as string;
        const enteredAmountNumber = +enteredAmount;
        
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
        setAmountIsValid(true);
    };

    return <MealForm onSubmit={submitHandler}>
        <Input
            ref={amountInputRef} 
            label = "Amount" 
            input = {{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter valid amount (1-5).</p>}
    </MealForm>
};