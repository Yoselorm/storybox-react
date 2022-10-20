import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { getFirestore, updateDoc } from "firebase/firestore";
import app from '../Firebase/Config';
import { doc, setDoc } from "firebase/firestore";
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

const Stories = (props) => {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState([]);
    const [show, setShow] = useState(false);
    const [loadshow, setLoadshow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const db = getFirestore(app);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        const metadata = {
            contentType: 'image'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
                if (progress != 100) {
                    setLoadshow(true)
                }
                else {
                    setLoadshow(false)
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    const newStory = {
                        name: name,
                        title: title,
                        body: body,
                        id: uuidv4(),
                        image: downloadURL
                    }
                    try {
                        await setDoc(doc(db, "UserStory", newStory.id), newStory);
                    } catch (error) {
                        console.log(error)
                    }
                    setLoadshow(false)
                    setName('')
                    setBody('')
                    setTitle('')
                    setShow(true)

                });

            }
        );

    }
    const backtohome = (e) => {
        e.preventDefault();
        navigate('/home')
    }
    // const handleImage = (e) => {
    //     e.preventDefault();
    //     const selected = e.target.files[0];
    //     setFile(selected)
    //     console.log(selected)
    // }

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
                            <input type='file' onChange={(e) => { setFile(e.target.files[0]) }} />
                            <p>Add a thumbnail</p>
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
            <Modal show={loadshow} onHide={handleClose} backdrop="static"
                keyboard={false} className='editmodal'>

                <Modal.Body className='modalbody'>loading...</Modal.Body>
                <Modal.Footer>
                    {/* <LinkContainer to={'/'}>
                        <Button className='modalbutton' variant="primary" onClick={handleClose}>
                            OK
                        </Button>
                    </LinkContainer> */}

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
