import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import userAccountImg from '../images/person.jpg';

import { 
    getInfoNotes, 
    getInfoAccounts, 
    getInfoTeachers,
    getInfoStudents,
    getInfoClasses,
    getInfoWorkers,
    getInfoParents,
    getInfoFinancialAccounts,
    getInfoFinancialBalance,
    getInfoActiveTeachers,
    getInfoExams,
    getExamSolution,
    getPrivateNotes
    } from '../state/infoSlice';



// style={{color: 'red'}}

function HomeContentHeader(){

    let dispatch = useDispatch();
    const {account} = useSelector( (state) => state.login );
    const {
        accounts, 
        teachers, 
        students, 
        classes, 
        workers,
        parents,
        headerPath,
        moneySafe
        } = useSelector( (state) => state.infos );

    // Monday, Oct 15th 2022

    const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    // console.log(DateNow); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time) aa

    useEffect( () => {
        dispatch(getInfoNotes());
        dispatch(getInfoAccounts());
        dispatch(getInfoTeachers());
        dispatch(getInfoStudents());
        dispatch(getInfoClasses());
        dispatch(getInfoWorkers());
        dispatch(getInfoParents());
        dispatch(getInfoFinancialAccounts());
        dispatch(getInfoFinancialBalance());
        dispatch(getInfoActiveTeachers());
        dispatch(getInfoExams());
        dispatch(getExamSolution());
        dispatch(getPrivateNotes());
    }, [dispatch]);


    function logoutBtn(e){
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <>
            <div className="Home-Content_Header">
                    <div className="Home-Content_Header_NavBar">
                        <ul className="Home-Content_Header_NavBar_Ul">
                            <li className="Home-Content_Header_NavBar_Ul_Li UserAccount">
                                <Link to={'/home/account_setting'}>
                                <i className="fa-solid fa-user"></i>
                                {/* <span>admin</span> */}
                                </Link>
                            </li>
                            <li className="Home-Content_Header_NavBar_Ul_Li">
                                <Link to={'/home/messages'}>
                                <i className="fa-solid fa-envelope"></i>
                                </Link>
                            </li>
                            <li className="Home-Content_Header_NavBar_Ul_Li UserAccount" onClick={(e) => {logoutBtn(e)}}>
                                <Link>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                {/* <span>Logout</span> */}
                                </Link>
                            </li>
                            <li className="Home-Content_Header_NavBar_Ul_Li">
                                <Link to={'/home/posts'}>
                                <i className="fa-solid fa-bullhorn"></i>
                                </Link>
                            </li>
                        </ul>
                        <h1>{headerPath}</h1>
                    </div>
            </div>
        </>
    )

};



export default HomeContentHeader;
