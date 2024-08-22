import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import usePizzaCart from '../hooks/usePizzaCart';

const Home = () => {
    const { pizzas, loading, error, addToCart } = usePizzaCart();
    
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

    return (
        <>
            <Header />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    {pizzas.map((pizza) => (
                        <Col md={4} className="mb-4 d-flex" key={pizza.id}>
                            <CardPizza
                                id={pizza.id}
                                name={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                img={pizza.img}
                                addToCart={() => addToCart({ ...pizza, quantity: 1 })}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Home;

