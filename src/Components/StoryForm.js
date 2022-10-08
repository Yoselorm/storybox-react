import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { getFirestore } from "firebase/firestore";
import app from '../Firebase/Config';
import { doc, setDoc } from "firebase/firestore";
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Stories = (props) => {
    console.log(props)
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const db = getFirestore(app);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStory = {
            name: name,
            title: title,
            body: body,
            file: file,
            id: uuidv4()
        }
        setName('')
        setBody('')
        setTitle('')
        setShow(true)
        try {
            await setDoc(doc(db, "UserStory", newStory.id), newStory);
        } catch (error) {
            console.log(error)
        }
    }
    const backtohome = (e) => {
        e.preventDefault();
        navigate('/home')
    }
    const handleImage = (e) => {
        e.preventDefault();
        const selected = e.target.files[0];
        setFile(selected)
        console.log(selected)
    }

    return (
        <div>

            <Container>
                <div>
                    <button className='back-btn' onClick={backtohome}><FontAwesomeIcon className='arrow' icon={faArrowLeft} /></button>
                </div>

                <Card style={{ width: '38rem' }} className="addstory-card">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Writer's Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <br />
                                <Form.Control type="text" placeholder='Enter Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <br />
                                    <Form.Control as="textarea" rows={10} value={body} onChange={(e) => { setBody(e.target.value) }} placeholder='Body' />
                                </Form.Group>
                            </Form.Group>
                            <input type='file' value={file} onChange={handleImage} />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false} className='editmodal'>

                <Modal.Body className='modalbody'>Added Successfully</Modal.Body>
                <Modal.Footer>
                    <LinkContainer to={'/'}>
                        <Button className='modalbutton' variant="primary" onClick={handleClose}>
                            OK
                        </Button>
                    </LinkContainer>

                </Modal.Footer>
            </Modal>

        </div>


    );
}

const mapStateToProps = (state) => {
    return {
        state: state.users,
    };
};



export default connect(mapStateToProps)(Stories);
