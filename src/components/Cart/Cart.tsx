import { FC } from "react";
import styled from "styled-components";
import { isPropertySignature } from "typescript";

import { Modal } from "../UI/Modal";

const CartUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 20rem;
    overflow: auto;
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1rem 0;
`;

export interface IButton {
    styleType: string
}
const Button = styled.button<IButton>`
    color: ${props => props.styleType === 'buttonAlt' ? '#8a2b06' : 'white'};
    background-color: ${props => props.styleType === 'buttonAlt' ? 'transparent' : '#8a2b06'};
`;

const Actions = styled.div`
    text-align: right;

    & button {
        font: inherit;
        cursor: pointer;
        border: 1px solid #8a2b06;
        padding: 0.5rem 2rem;
        border-radius: 25px;
        margin-left: 1rem;

        &:hover,
        &:active {
            background-color: #5a1a01;
            border-color: #5a1a01;
            color: white;
        }
    }
`;

const DUMMY_CART_ITEMS = [{
    id: 'c1',
    name: 'sushi',
    amount: 2,
    price: 12.99
}]

export interface ICart {
    onCartNonVisible: () => void
}

export const Cart: FC<ICart> = (props) => {

    const cartItems = <CartUl>{DUMMY_CART_ITEMS.map(item => {
        return <li>
            {item.name}
        </li>
    })}</CartUl>

    return <Modal onClick={props.onCartNonVisible} >
        {cartItems}
        <Total>
            <span>Total Amount</span>
            <span>21.37</span>
        </Total>
        <Actions>
            <Button styleType='buttonAlt' onClick={props.onCartNonVisible}>Close</Button>
            <Button styleType='button'>Order</Button>  
        </Actions>
    </Modal>
};