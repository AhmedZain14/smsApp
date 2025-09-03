import { useEffect, useState } from 'react';
import { Outlet, Navigate  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


function RootLayout(){

    const {account} = useSelector( (state) => state.login );


    return (
        <>
            { (account) ? <Outlet/> : <Navigate to="/login" replace={true}/> }
        </>
    )

};



export default RootLayout;
