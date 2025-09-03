import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from "react-router-dom";
import userAccountImg from '../images/person.jpg';

// Components


// style={{color: 'red'}}

function DashboardContentBody(){

    const {account} = useSelector( (state) => state.login );


    return (
        <>
            <div className="DashBoard-Content_Body">
                <Outlet />
            </div>
        </>
    )

};



export default DashboardContentBody;
