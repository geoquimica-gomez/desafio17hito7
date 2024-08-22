import { Container, Nav, Navbar, Image, Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

const NavbarApp = () => {
    const { calculateTotal } = useContext(CartContext);
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
    const { token, logout } = useContext(UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
            <Container>
                <Navbar.Brand className="text-white">
                    <Image className='logo' src="https://static.vecteezy.com/system/resources/previews/036/485/265/original/kawaii-pizza-slice-cartoon-character-flat-design-png.png" />
                    Pizzería delicias de Alondra!
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-home">Ir a la página principal</Tooltip>}
                        >
                            <NavLink to="/" className={`btn1 ${setActiveClass}`}>🍕Home</NavLink>
                        </OverlayTrigger>
                        {token ? (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-profile">Ver perfil</Tooltip>}
                            >
                                <NavLink to="/profile" className={`btn1 ${setActiveClass}`}>🔓Profile</NavLink>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-login">Iniciar sesión</Tooltip>}
                            >
                                <NavLink to="/login" className={`btn1 ${setActiveClass}`}>🔐Login</NavLink>
                            </OverlayTrigger>
                        )}
                        {token ? (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-logout">Cerrar sesión</Tooltip>}
                            >
                                <button onClick={logout} className="btn4">🔒Logout</button>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-register">Registrarse</Tooltip>}
                            >
                                <NavLink to="/register" className={`btn1 ${setActiveClass}`}>🔐Register</NavLink>
                            </OverlayTrigger>
                        )}
                    </Nav>
                    <Nav>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-cart">Ver carrito de compras</Tooltip>}
                        >
                            <NavLink to="/cartShooping" className={`btn2 ${setActiveClass}`}>
                                🛒Total: {calculateTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </NavLink>
                        </OverlayTrigger>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarApp;
