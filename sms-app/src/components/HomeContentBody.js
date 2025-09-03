import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from "react-router-dom";
import userAccountImg from '../images/person.jpg';

// Components


// style={{color: 'red'}}

function HomeContentBody(){

    const {account} = useSelector( (state) => state.login );


    return (
        <>
            <div className="Home-Content_Body">
                <Outlet />
            </div>
        </>
    )

};



export default HomeContentBody;
