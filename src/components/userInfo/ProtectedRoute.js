import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(prop) {
    const { isUserDataLoading, isAuthenticated, element, shouldCheckAdmin, isAdmin } = prop;

    if(isUserDataLoading){
        return <div>Loading ... </div>;
    }
    if (shouldCheckAdmin) {
        return isAdmin ? element : <Navigate to='/Login' />
    }

    return isAuthenticated? element: <Navigate to = '/Login' />
   
}
