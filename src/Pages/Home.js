import React, { useEffect } from 'react';
import Features from '../Components/Features';
import { connect } from 'react-redux';
import { Card, Form, Button, Container, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";
import app from '../Firebase/Config';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addUser, authUser } from '../Redux/Action';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FaPenAlt, IconName } from "react-icons/fa";


const Home = (props) => {
    // console.log(props)
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Add a Story
        </Tooltip>
    );

    const navigate = useNavigate();
    const auth = getAuth();
    const data = useSelector((state) => state.users)

    const handleSignOut = async (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login', { replace: true });
            dispatch(authUser(false));

        }).catch((error) => {
            // An error happened.
        });

    }
    const ToWriteUp = (e) => {
        e.preventDefault();
        navigate('/stories')
    }

    const db = getFirestore(app);
    const dispatch = useDispatch();
    useEffect(() => {

        const getData = () => {
            const q = query(collection(db, "UserStory"));
            onSnapshot(q, (querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });
                console.log(users);
                dispatch(addUser(users));
            });
        }
        getData()
    }, []);

    console.log(data)

    return (
        <div className='whole-homecard'>
            <div className='homebtn-share'>
                <button className='homebtn' onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className='homecard'>
                {data.map((item) => {
                    return (
                        <div key={item.id} >
                            <Features user={item} />
                        </div>
                    )
                })}
            </div>

            <div className="img">
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <button className='Pen-btn' onClick={ToWriteUp} ><FaPenAlt className='pen' /></button>
                </OverlayTrigger>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        state: state.users
    }
}


export default connect(mapStateToProps)(Home);
