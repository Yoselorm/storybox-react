import React, { useState } from 'react';
import { Form, Button, Anchor, Modal, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                navigate('/home', { replace: true })
                setShow(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }
    return (
        <div className='login-form'>
            <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false} className='editmodal'>

                <Modal.Body className='modalbody'>
                    {[
                        'danger',

                    ].map((variant) => (
                        <Alert key={variant} variant={variant}>
                            Sign Up Successful
                        </Alert>))}

                </Modal.Body>
                <Modal.Footer>
                    <Button className='modalbutton' variant="danger" onClick={handleClose}>
                        OK
                    </Button>


                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SignUp;
