import React, { useState } from 'react';
import { Card, Form, Button, Container, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Edit from './Edit';





const Features = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const dispatch = useDispatch();

    // const renderTooltip = (props) => (
    //     <Tooltip id="button-tooltip" {...props}>
    //         Add a Story
    //     </Tooltip>
    // );
    return (
        <div >
            <Container >
                <br />
                <Card className='decard' style={{ width: '13rem' }}>
                    <Card.Body>
                        <img src={props.user.image} className='image' />
                        <h4>{props.user.title}</h4>
                        <span>Written by: {props.user.name}</span>
                        <div className='debtn'>
                            <Button className='delbtn' variant="light" onClick={handleShow} >Read</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false} className='edit-modal'>
                <h3 style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{props.user.title}</h3>
                <Modal.Body style={{ width: '55rem', margin: '20px' }}>
                    {props.user.body}
                </Modal.Body>
                <Button className='close' onClick={handleClose}>
                    Done
                </Button>
            </Modal>

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        state: state.users
    }
}

export default connect(mapStateToProps)(Features);
