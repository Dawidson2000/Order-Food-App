import { FC } from "react";
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
    id: string
}

export const MealItemForm: FC<IMealItemForm> = (props) => {
    return <MealForm>
        <Input 
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
    </MealForm>
};