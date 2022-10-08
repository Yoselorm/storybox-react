import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const Edit = (props) => {

    const [name, setName] = useState(props.user.name);
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Writer's Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <br />
                    <Form.Control type="text" placeholder='Enter Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <br />
                        <Form.Control as="textarea" rows={10} value={body} onChange={(e) => { setBody(e.target.value) }} placeholder='Body' />
                    </Form.Group>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>




        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        state: state.users,
    };
};

export default connect(mapStateToProps)(Edit);
