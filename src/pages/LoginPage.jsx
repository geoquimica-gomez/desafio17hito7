import { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
    // Estados del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para los errores
    const [error, setError] = useState(false);

    // Funciones para validar los campos
    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = () => password.length >= 6;

    // Función antes de enviar el formulario
    const validarDatos = (e) => {
        e.preventDefault();
        // Validación
        if (!email.trim() || !password.trim() || !isEmailValid() || !isPasswordValid()) {
            setError(true);
            return;
        }

        setError(false);
        setEmail("");
        setPassword("");

        toast.success("Has iniciado sesión correctamente!");
    };

    return (
        <Container
            fluid
            className="p-3"
            style={{
                maxWidth: '70%',
                backgroundColor: '#f7886748',
                margin: '10px auto',
                borderRadius: '10px',
                borderTop: '10px solid #333',
                borderBottom: '10px solid #333'
            }}
        >
            <Row>
                <Col md={4} className="d-none d-md-block">
                    <img
                        src="https://noobcook.com/wp-content/uploads/2022/09/mushroom_margherita_mini_pizza_recipe-620x930.jpg"
                        alt="Decorative"
                        style={{ width: '100%', height: '400px' }}
                    />
                </Col>
                <Col md={8}>
                    <h1>Inicia Sesión</h1>
                    <h6>Tu pizza favorita te espera. ¿Listo para el reencuentro?</h6>
                    <Form className='customForm' onSubmit={validarDatos}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo *</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    isInvalid={!isEmailValid() && email.trim() !== ''}
                                    style={{
                                        borderColor: isEmailValid() ? 'green' : '',
                                        borderWidth: isEmailValid() ? '2px' : '',
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El correo no es válido.
                                </Form.Control.Feedback>
                                {isEmailValid() && email.trim() !== '' && (
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                    </InputGroup.Text>
                                )}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña *</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    isInvalid={!isPasswordValid() && password.trim() !== ''}
                                    style={{
                                        borderColor: isPasswordValid() ? 'green' : '',
                                        borderWidth: isPasswordValid() ? '2px' : '',
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    La contraseña debe tener al menos 6 caracteres.
                                </Form.Control.Feedback>
                                {isPasswordValid() && password.trim() !== '' && (
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                    </InputGroup.Text>
                                )}
                            </InputGroup>
                        </Form.Group>

                        <Button type="submit" className='btn3' style={{ width: '100%', marginTop: '15px' }}>
                            Iniciar sesión
                        </Button>
                        <div className="mt-3">
                            {error && <Alert variant="danger">Todos los campos son obligatorios y deben ser válidos.</Alert>}
                        </div>
                    </Form>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
