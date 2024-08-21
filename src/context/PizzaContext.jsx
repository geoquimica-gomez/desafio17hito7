import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultarApi();
    }, []);

    const consultarApi = async () => {
        try {
            setLoading(true);
            const url = "http://localhost:5000/api/pizzas";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPizzas(data);
            setError(null);
        } catch (error) {
            setError(`Error al obtener los datos: ${error.message}`);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const getPizzaById = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la pizza');
            }
            const pizza = await response.json();
            return pizza;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({ pizzas, loading, error, getPizzaById }), [pizzas, loading, error, getPizzaById]);

    return (
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    );
};

PizzaProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
