import React from "react";

import type { CartItem } from './CartProvider';

export const CartContext = React.createContext({
    items: [] as CartItem[],
    totalAmount: 0,
    addItem: (item: CartItem) => {},
    removeItem: (item: CartItem) => {}
});