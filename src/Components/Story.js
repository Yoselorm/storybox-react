import React, { useState } from 'react';
import { Card, Form, Button, Container, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import Edit from './Edit';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

const Story = (props) => {
    console.log(props)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const state = useSelector(state => state.users);
    // const users = state.map((state) => {
    //     return (
    //         <div key={state.id}>
    //             <Edit state={state} />
    //         </div>
    //     )
    // })


    return (
        <div>
            {/* <Container>
                <h3></h3>
                <Button className='editbtn' variant="light" onClick={handleShow} >📝</Button>


                <Modal show={show} onHide={handleClose} className='edit-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: '38rem' }}>
                        {/* {state.map((state) => {
                            return (
                                <div key={state.id}>
                                    <Edit user={state} />
                                </div>
                            )
                        })} 
                        <Edit />
                    </Modal.Body>
                </Modal>
            </Container> */}
            {props.state.map((item, index) => {
                return (
                    <div key={item.id}>
                        <Container>
                            <Modal show={show} onHide={handleClose} className='edit-modal'>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ width: '38rem' }}>

                                    <Edit user={item} />
                                </Modal.Body>
                            </Modal>
                        </Container>
                    </div>
                )
            })}
            <Button className='editbtn' variant="light" onClick={handleShow} >📝</Button>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        state: state.users
    }
}
export default connect(mapStateToProps)(Story);
