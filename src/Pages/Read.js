import React from 'react';
import Story from '../Components/Story';
import { connect, useSelector } from 'react-redux/es/exports';
import Edit from '../Components/Edit';

const About = (props) => {
    //console.log(props)
    // const state = useSelector(state => state.users);

    return (
        <div>
            {props.state.map((item, index) => {
                return (
                    <div key={item.id}>
                        <h3>item.body</h3>
                    </div>
                )
            })}
            <Story />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.users
    }
}

export default connect(mapStateToProps)(About);
