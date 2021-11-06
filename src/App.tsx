import React, { useState } from 'react';

import { Header } from './components/Layout/Header';
import { Meals } from './components/Meals/Meals';
import { Cart } from './components/Cart/Cart';
import { CartProvider } from './store/CartProvider';

function App() {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const setCartVisible = () => {
    setIsCartVisible(true);
  }
  
  const setCartNonVisible = () => {
    setIsCartVisible(false);
  }


  return (
    <CartProvider>
      {isCartVisible && <Cart onCartNonVisible={setCartNonVisible}/>}
      <Header onCartVisible={setCartVisible} />
      <Meals />
    </CartProvider>
  );
}

export default App;
