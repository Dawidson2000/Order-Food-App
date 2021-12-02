import { FC, useContext, useState } from "react";
import styled from "styled-components";
import useHttp from "../../hooks/use-http";

import { Modal } from "../UI/Modal";
import { CartContext } from "../../store/cart-context";
import { CartItemElement } from "./CartItemElement";
import { CartItem } from "../../store/CartProvider";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutData } from "./CheckoutForm";
import { LoadingScreen } from "../UI/LoadingScreen";

const CartUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1rem 0;
`;

const Message = styled.p`
    font-weight: 600;
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


export interface ICart {
    onCartNonVisible: () => void
}

export const Cart: FC<ICart> = (props) => {
    const [isCheckout, setIsCheckout] = useState<Boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<Boolean>(false);

    const cartContext = useContext(CartContext);

    const { error, isLoading, sendRequest: sendOrder } = useHttp();

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemAddHandler = (item: CartItem) => {
        cartContext.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (item: CartItem) => {
        cartContext.removeItem({ ...item, amount: 1 });
    };

    const cartItems = <CartUl>{cartContext.items.map(item => {
        return <CartItemElement
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item)} />
    })}</CartUl>

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const orderSubmitHandler = (checkoutData: CheckoutData) => {
        console.log(cartContext.items[0].id);

        const apllyOrder = () => {
            setIsSubmitted(true);
            cartContext.clearCart();
        };

        sendOrder({
            url: 'https://react-dummy-http-72feb-default-rtdb.firebaseio.com/orders.json',
            method: 'POST',
            body: { userData: checkoutData, orderedMeals: cartContext.items, totalAmount: cartContext.totalAmount },
            headers: {
                'Content-Type': 'application/json',
            }
        }, apllyOrder)
    };

    let formContent: any = isCheckout && <CheckoutForm onClose={props.onCartNonVisible} onConfirm={orderSubmitHandler} />

    if (error) {
        formContent = <Message>Something gone wrong</Message>;
    }

    if (isLoading) {
        formContent = <LoadingScreen />;
    }

    return <Modal onClick={props.onCartNonVisible}>
        {cartItems}
        {!isSubmitted ?
            <>
                <Total>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </Total>
                <>{formContent}</>
                <Actions>
                    {!isCheckout && <Button styleType='buttonAlt' onClick={props.onCartNonVisible}>Close</Button>}
                    {hasItems && !isCheckout && <Button styleType='button' onClick={orderHandler}>Order</Button>}
                </Actions>
            </>
            : <Message>Thanks for your Order</Message>}
    </Modal>
};