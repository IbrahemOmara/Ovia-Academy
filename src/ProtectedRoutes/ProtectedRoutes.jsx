import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function ProtectedRoutes({children}) {

    let token ;
    localStorage.dataAuth?token = JSON.parse(localStorage.dataAuth).token.token:token=null;

    try {
        const decoded = jwtDecode(token);
        if(token) return children; 
    } catch (error) {
        localStorage.clear();
        return <Navigate to='/sign-in' />;
    }
}
