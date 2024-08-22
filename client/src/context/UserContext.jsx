import { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(true);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        setToken(false);
        navigate('/login');
    }, [navigate]);

    const value = useMemo(() => ({
        token,
        setToken,
        logout,
    }), [token, logout]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
