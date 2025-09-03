import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, json } from "react-router-dom";
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
    getInfoGrades,
    getPrivateNotes
    } from '../state/infoSlice';



// style={{color: 'red'}}

function DashboardContentHeader(){

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
        dispatch(getInfoGrades());
        dispatch(getPrivateNotes());
    }, [dispatch]);


    function logoutBtn(e){
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <>
            <div className="DashBoard-Content_Header">
                    <div className="DashBoard-Content_Header_NavBar">
                        <ul className="DashBoard-Content_Header_NavBar_Ul">
                            <li className="DashBoard-Content_Header_NavBar_Ul_Li UserAccount">
                                <Link to={'/dashboard/setting'}>
                                <i className="fa-solid fa-user"></i>
                                {/* <span>admin</span> */}
                                </Link>
                            </li>
                            <li className="DashBoard-Content_Header_NavBar_Ul_Li UserAccount" onClick={(e) => {logoutBtn(e)}}>
                                <Link>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                {/* <span>Logout</span> */}
                                </Link>
                            </li>
                            <li className="DashBoard-Content_Header_NavBar_Ul_Li">
                                <Link to={'/dashboard/calculator'}>
                                <i className="fa-solid fa-calculator"></i>
                                </Link>
                            </li>
                            <li className="DashBoard-Content_Header_NavBar_Ul_Li">
                                <Link to={'/dashboard/posts'}>
                                <i className="fa-solid fa-bullhorn"></i>
                                </Link>
                            </li>
                            <li className="DashBoard-Content_Header_NavBar_Ul_Li">
                                <Link to={'/dashboard/camera'}>
                                <i className="fa-solid fa-display"></i>
                                </Link>
                            </li>
                        </ul>
                        <h1>{headerPath}</h1>
                    </div>
                    <div className="DashBoard-Content_Header_Info">
                        <div className="DashBoard-Content_Header_Info_Date">
                            <i className="fa-solid fa-calendar-days"></i>
                            <span className="DashBoard-Content_Header_Info_Date_Text">
                                {DateNow}
                            </span>
                        </div>
                        <div className="DashBoard-Content_Header_Info_Statistics">
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>الخزانة المالية</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                   {parseFloat(localStorage.getItem("moneySafeCount") || 0.000)} ج.م
                                </div>
                            </div>
                            <span className="DashBoard-Content_Header_Info_Statistics_BreakLine">|</span>
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>حسابات المستخدمين</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                    {accounts.count}
                                </div>
                            </div>
                            <span className="DashBoard-Content_Header_Info_Statistics_BreakLine">|</span>
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>المعلمون</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                    {teachers.count}
                                </div>
                            </div>
                            <span className="DashBoard-Content_Header_Info_Statistics_BreakLine">|</span>
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>الطلاب</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                    {students.count}
                                </div>
                            </div>
                            <span className="DashBoard-Content_Header_Info_Statistics_BreakLine">|</span>
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>أولياء الأمور</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                    {parents.count}
                                </div>
                            </div>
                            <span className="DashBoard-Content_Header_Info_Statistics_BreakLine">|</span>
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>الفصول</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                    {classes.count}
                                </div>
                            </div>
                            <span className="DashBoard-Content_Header_Info_Statistics_BreakLine">|</span>
                            <div className="DashBoard-Content_Header_Info_Statistics_Item">
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Text">
                                    <i className="fa-solid fa-caret-up"></i>
                                    <span>الموظفون</span>
                                </div>
                                <div className="DashBoard-Content_Header_Info_Statistics_Item_Count">
                                    {workers.count}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )

};



export default DashboardContentHeader;
