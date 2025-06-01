import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';


const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.users);

    if (loading) {
        return (<div>
            <p>Loading</p>
        </div>)
    }

    return isAuthenticated ? <Outlet/> : <Navigate to={'/login'}/> 
};



export default PrivateRoute;