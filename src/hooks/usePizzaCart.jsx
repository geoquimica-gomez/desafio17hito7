import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { PizzaContext } from '../context/PizzaContext';

const usePizzaCart = () => {
    const { cart, increaseQuantity, decreaseQuantity, calculateTotal,  addToCart } = useContext(CartContext);
    const { pizzas, loading, error, getPizzaById } = useContext(PizzaContext);

    return { cart, pizzas, increaseQuantity, decreaseQuantity, calculateTotal, loading, error, getPizzaById, addToCart };
};

export default usePizzaCart;
