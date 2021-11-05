import React, { useState } from 'react';

import { Header } from './components/Layout/Header';
import { Meals } from './components/Meals/Meals';
import { Cart } from './components/Cart/Cart';

function App() {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const setCartVisible = () => {
    setIsCartVisible(true);
  }
  
  const setCartNonVisible = () => {
    setIsCartVisible(false);
  }


  return (
    <>
      {isCartVisible && <Cart onCartNonVisible={setCartNonVisible}/>}
      <Header onCartVisible={setCartVisible} />
      <Meals />
    </>
  );
}

export default App;
