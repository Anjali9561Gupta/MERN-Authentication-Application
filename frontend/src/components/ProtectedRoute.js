
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; 

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    const { user } = useAuthContext();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user) {
                    return <Redirect to="/login" />;
                }

                if (role && user.role !== role) {
                    return <Redirect to="/" />; 
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
