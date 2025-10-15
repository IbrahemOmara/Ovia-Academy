import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutesInstructor({children}) {
    let dataUser ;
    localStorage.dataAuth?dataUser = JSON.parse(localStorage.dataAuth):dataUser=null;

    try {
        const instructor = dataUser.role;
        if(instructor==='Instructor') return children; 
        return <Navigate to='/' />; 
    } catch (error) {
        return <Navigate to='/' />;
    }
}
