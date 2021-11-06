import { FC, useReducer } from "react";
import { CartContext } from "./cart-context";

export type CartItem = {
    id: string,
    name:  string, 
    price: number,
    amount: number 
}

enum CartActionKind {
    ADD = 'ADD',
    REMOVE = 'REMOVE'
}

interface CartState {
    items: CartItem[],
    totalAmount: number
}

interface CartAction {
    type: CartActionKind,
    item: CartItem,
}

const defaultCartState = {
    items: [],
    totalAmount: 0
} as CartState

const CartReducer = (state: CartState,  action: CartAction) => {
    if(action.type === CartActionKind.ADD){
       const updatedItems = state.items.concat(action.item);
       const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; 
       return {
           items: updatedItems,
           totalAmount: updatedTotalAmount
       }
    }
    return defaultCartState
};

export const CartProvider: FC = props => {
    const [cartState, cartDispatch] = useReducer(CartReducer, defaultCartState);

    const addItemToCartProvider = (item: CartItem) => {
        cartDispatch({type: CartActionKind.ADD, item: item});
    };

    const removeItemFromCartHandler = (item: CartItem) => {
        cartDispatch({type: CartActionKind.REMOVE, item: item});
    };

    const cartContext = {
        items: [] as CartItem[],
        totalAmount: 0,
        addItem: addItemToCartProvider,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}