import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row className="text-center">
                <Col>
                    <h1 className="display-1 text-danger">404</h1>
                    <h2 className="mb-4">Página No Encontrada</h2>
                    <p className="mb-4">Lo sentimos, pero la página que estás buscando no existe.</p>
                    <Link to="/">
                        <Button variant="danger" size="lg">
                            Volver al Inicio 🍕
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
