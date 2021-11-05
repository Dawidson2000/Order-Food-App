import { FC } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    
    & label {
        font-weight: bold;
        margin-right: 1rem;
    }

    & input {
        width: 3rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font: inherit;
        padding-left: 0.5rem;
    }
`;

export interface IInput {
    label: string,
    input: {
        id: string,
        type: string,
        min: string,
        max: string,
        step: string,
        defaultValue: string
    }
}

export const Input: FC<IInput> = (props) => {
    return <InputWrapper>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} />
    </InputWrapper>
};