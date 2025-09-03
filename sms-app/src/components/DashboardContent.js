import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import userAccountImg from '../images/person.jpg';
import DashboardContentBody from './DashboardContentBody';

// Components
import DashboardContentHeader from './DashboardContentHeader';

// style={{color: 'red'}}

function DashboardContent(){

    const {account} = useSelector( (state) => state.login );


    return (
        <>
            <div className="DashBoard-Content">
                {<DashboardContentHeader />}
                {<DashboardContentBody />}
            </div>
        </>
    )

};



export default DashboardContent;
