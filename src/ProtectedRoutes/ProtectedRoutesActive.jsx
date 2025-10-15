import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutesActive({children}) {
    let dataUser ;
    localStorage.dataAuth?dataUser = JSON.parse(localStorage.dataAuth):dataUser=null;

    try {
        const active = dataUser.role;
        if(active==='Active') return children; 
        return <Navigate to='/' />; 
    } catch (error) {
        return <Navigate to='/' />;
    }
}
