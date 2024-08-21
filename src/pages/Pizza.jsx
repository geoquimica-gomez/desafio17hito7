import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import usePizzaCart from '../hooks/usePizzaCart';

const Pizza = () => {
    const { id } = useParams();
    const { getPizzaById, loading, error, addToCart } = usePizzaCart();
    const [pizza, setPizza] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const NOTIFICATION_TIMEOUT = 3000;

    useEffect(() => {
        const fetchPizza = async () => {
            const pizzaData = await getPizzaById(id);
            setPizza(pizzaData);
        };

        fetchPizza();

        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, NOTIFICATION_TIMEOUT);
            return () => clearTimeout(timer);
        }
    }, [id, getPizzaById, showNotification]);

    const handleAddPizza = () => {
        if (pizza) {
            addToCart(pizza);
            setShowNotification(true);
        }
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border">
                    <output aria-live="polite" className="visually-hidden">Cargando...</output>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!pizza) {
        return (
            <Container className="mt-4">
                <Alert variant="warning">No se encontró la pizza.</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={10} className="mb-5">
                    <Card className="pizza-card">
                        <Row noGutters className="align-items-center">
                            <Col md={5}>
                                <Card.Img src={pizza.img} alt={pizza.name} className="img-left"/>
                            </Col>
                            <Col md={7}>
                                <Card.Body>
                                    <Card.Title className='pizza-title'>{pizza.name}</Card.Title>
                                    <Card.Text>{pizza.desc}</Card.Text>
                                    <Card.Text>
                                        <strong>Ingredientes:</strong>
                                        <ul>
                                            {pizza.ingredients.map((ingredient) => (
                                                <li key={ingredient}>🍕 {ingredient}</li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Precio:</strong> {pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </Card.Text>
                                    <Button className='btnAddPizza' onClick={handleAddPizza}>Añadir al 🛒</Button>

                                    {showNotification && (
                                        <Alert variant="success" className="mt-3">
                                            ¡Pizza añadida al carrito!
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Pizza;
