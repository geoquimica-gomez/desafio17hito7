import { useContext } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Table, Alert } from 'react-bootstrap';
import usePizzaCart from '../hooks/usePizzaCart';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { cart, pizzas, increaseQuantity, decreaseQuantity, calculateTotal } = usePizzaCart();
    const { token } = useContext(UserContext);

    const getPizzaDetails = (pizzaId) => {
        return pizzas.find(pizza => pizza.id === pizzaId);
    };

    if (cart.length === 0) {
        return (
            <Container className="mt-4">
                <Alert variant="info">No hay pizzas en el carrito.</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-3 mb-3">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card>
                        <Card.Header>Carrito de Compras</Card.Header>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    {cart.map((cartItem, index) => {
                                        const pizzaDetails = getPizzaDetails(cartItem.id);
                                        return (
                                            <ListGroup.Item key={cartItem.id}>
                                                <Row className="align-items-center">
                                                    <Col md={3}>
                                                        <Card.Img src={pizzaDetails?.img} alt={pizzaDetails?.name} />
                                                    </Col>
                                                    <Col md={3}>
                                                        <h5>{pizzaDetails?.name}</h5>
                                                        <p>{pizzaDetails?.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button variant="outline-secondary" onClick={() => decreaseQuantity(index)}>-</Button>
                                                        <span className="mx-2">{cartItem.quantity}</span>
                                                        <Button variant="outline-secondary" onClick={() => increaseQuantity(index)}>+</Button>
                                                    </Col>
                                                    <Col md={3}>
                                                        <h5>Sub total:</h5>
                                                        <p>{(pizzaDetails?.price * cartItem.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card.Body>
                                    <Card.Title className="mb-4">Detalle de Pago</Card.Title>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Cantidad</th>
                                                <th>Descripción</th>
                                                <th>Precio Unitario</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((cartItem) => {
                                                const pizzaDetails = getPizzaDetails(cartItem.id);
                                                return (
                                                    <tr key={cartItem.id}>
                                                        <td>{cartItem.quantity}</td>
                                                        <td>{pizzaDetails?.name}</td>
                                                        <td>{pizzaDetails?.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                                        <td>{(pizzaDetails?.price * cartItem.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                                <td><strong>{calculateTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    {!token && (
                                        <Alert variant="warning" className="mt-3">
                                            Debes iniciar sesión para proceder al pago.
                                        </Alert>
                                    )}
                                    <Button
                                        variant="success"
                                        className="mt-3"
                                        disabled={!token}
                                    >
                                        Pagar
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;

