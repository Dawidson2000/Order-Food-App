import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../../store/cart-context";


import { CartIcon } from "../Cart/CartIcon";

export interface IButton {
    onItemChange: boolean
}

const Button = styled.button<IButton>`
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
    animation: ${props => props.onItemChange ? 'bump 300ms ease-out' : 'none'};

    @keyframes bump {
        0% {
            transform: scale(1);
        }
        10% {
            transform: scale(0.9);
        }
        30% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
}

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

export interface IHeaderCartButton {
    onClick: () => void
}

export const HeaderCartButton: FC<IHeaderCartButton> = (props) => {
    const [isButtonHighlighted, setIsButtonHighlighted] = useState<boolean>(false);

    const cartContext = useContext(CartContext);

    useEffect(() => {
        setIsButtonHighlighted(true);

        const timer = setTimeout(() => {
            setIsButtonHighlighted(false); 
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    },[cartContext.totalAmount]);

    const numberOfCartItems = cartContext.items.reduce((curNumber: number, item: any) => {
        return curNumber + item.amount
    }, 0);

    return <Button onItemChange={isButtonHighlighted} onClick={props.onClick}>
        <IconSpan><CartIcon/></IconSpan>
        <span>Your Cart</span>
        <BadgeSpan>{numberOfCartItems}</BadgeSpan>
    </Button>
}