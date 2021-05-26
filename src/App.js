import { useState } from "react";
import Cart from "./Components/Cart/Cart.js";
import Header from "./Components/Layout/Header.js";
import Meals from "./Components/Meals/Meals.js";
import CartProvider from "./store/CartProvider.js";

function App() {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const showCartHandler = ()=>{
        console.log("Cart button clicked");
        setIsCartVisible(true);
    };

    const closeCartHandler=()=>{
        setIsCartVisible(false);
    };

    return (
        <CartProvider>
            {isCartVisible && <Cart onClose={closeCartHandler}/>}
            <Header onShowCart={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
