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
    REMOVE = 'REMOVE',
    CLEAR = 'CLEAR'
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
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems: CartItem[];

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

       const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; 
       return {
           items: updatedItems,
           totalAmount: updatedTotalAmount
       }
    }
    if(action.type === CartActionKind.REMOVE){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems: CartItem[];
        
        if(existingCartItem.amount > 1){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = [...state.items];
            updatedItems.splice(existingCartItemIndex, 1)
            ///updatedItems = state.items.filter(item => item.id !== action.item.id)
        }

        const updatedTotalAmount = state.totalAmount - action.item.price * action.item.amount; 
        return {
           items: updatedItems,
           totalAmount: updatedTotalAmount
        }
    }

    if(action.type === CartActionKind.CLEAR){
        return {
            items: [],
            totalAmount: 0
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
    
    const clearCartHandler = () => {
        cartDispatch({type: CartActionKind.CLEAR, item: {} as CartItem});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartProvider,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}