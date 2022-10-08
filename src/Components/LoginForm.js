import React, { useState } from 'react';
import { Form, Button, Anchor, Modal, Alert } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { async } from '@firebase/util';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleSignUpPage = (e) => {
        e.preventDefault();
        navigate('/signUp')
    }

    const handleGoogle = async (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/home', { replace: true })
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                navigate('/home', { replace: true })
                console.log('sign in successful')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('not successful')
                setShow(true);
            });

    }
    return (
        <div className='login-form'>
            <Form onSubmit={handleSignIn}>
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
                <div className='btn-share'>
                    {/* <Button className='signup-btn'>
                        login
                    </Button> */}
                    <button className='login-btn'>login</button>
                    <button className='signup-btn' onClick={handleSignUpPage}>Create account</button>
                </div>
                <div>
                    <button className='provider-btn' onClick={handleGoogle}><FcGoogle /></button>
                    <button className='provider-btn'><GoMarkGithub /></button>
                </div>
            </Form>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false} className='editmodal'>

                <Modal.Body className='modalbody'>
                    {[
                        'danger',

                    ].map((variant) => (
                        <Alert key={variant} variant={variant}>
                            Incorrect email or password
                        </Alert>))}

                </Modal.Body>
                <Modal.Footer>
                    <Button className='modalbutton' variant="danger" onClick={handleClose}>
                        OK
                    </Button>


                </Modal.Footer>
            </Modal>


            {/* <Alert show={show} variant="success">
                    <Alert.Heading>How's it going?!</Alert.Heading>
                    <p>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                        lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                        fermentum.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close me y'all!
                        </Button>
                    </div>
                </Alert> */}

        </div>
    );
}

export default LoginForm;
