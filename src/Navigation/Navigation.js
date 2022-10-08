import React from 'react';
import NavBar from './NavBar';
//import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, connect } from 'react-redux/es/exports';
import Stories from '../Pages/AddStory';
import Read from '../Pages/Read';
import Home from '../Pages/Home';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../Pages/Login';
import SignUp from '../Components/SignUp';

const Navigation = (props) => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ProtectedRoute />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/stories' element={<Stories />} />
                    <Route path='/read' element={<Read user={props.state} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        state: state.users
    }
}
export default connect(mapStateToProps)(Navigation);
