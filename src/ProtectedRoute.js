import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {

    const user = useSelector((state) => state.authUser);
    const navigate = useNavigate()
    console.log(user)

    if (user === false) {
        return <Navigate to={'/login'} replace={true} />
        //navigate('/login', { replace: true })
    }
    return (
        <div>
            <Navigate to={'/home'} replace={true} />
        </div>
    );
}

export default ProtectedRoute;
