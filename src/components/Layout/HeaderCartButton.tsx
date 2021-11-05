import { FC } from "react";
import styled from "styled-components";

import { CartIcon } from "../Cart/CartIcon";

const Button = styled.button`
    cursor: pointer;
    font: inherit;
    border: none;
    background-color: #4d1601;
    color: white;
    padding: 0.75rem 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 25px;
    font-weight: bold;

    &:hover,
    &:active {
        background-color: #2c0d00;
    }
`;

const IconSpan = styled.span`
    display: flex;
    
    & svg {
        width: 1.35rem;
        height: 1.35rem;
        margin-right: 0.5rem;
    }
`;

const BadgeSpan = styled.span`
    background-color: #b94517;
    padding: 0.25rem 1rem;
    border-radius: 25px;
    margin-left: 1rem;
    font-weight: bold;
    
    ${Button}:hover &,
    ${Button}:active & {
        background-color: #92320c; 
    }
`;

export const HeaderCartButton: FC = () => {
    return <Button>
        <IconSpan><CartIcon/></IconSpan>
        <span>Your Cart</span>
        <BadgeSpan>3</BadgeSpan>
    </Button>
}