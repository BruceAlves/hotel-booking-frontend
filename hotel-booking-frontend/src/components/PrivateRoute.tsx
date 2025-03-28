
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
    children: React.ReactNode; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.user.token); 
    console.log('Token da Redux:', token); 
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>; 
};

export default PrivateRoute;
