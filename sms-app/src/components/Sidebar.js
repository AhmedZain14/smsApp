import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, NavLink } from "react-router-dom";
import image1 from '../images/imagepost2.jpg';
import { getInfoSystemSetting } from '../state/infoSlice';


function Sidebar(){

    let dispatch = useDispatch();
    const {account} = useSelector( (state) => state.login );
    const infos = useSelector( (state) => state.infos );

    // useEffect( () => {
    //     dispatch(getInfoSystemSetting());
    // }, [dispatch]);

    return (
        <>
            <div className="DashBoard-Sidebar">
                <div className="DashBoard-Sidebar_Header">
                    <div className="DashBoard-Sidebar_Header_Content">
                        {/* <img src={image1} alt="" /> */}
                        <div className="image">
                            
                        </div>
                        <div className="text">
                            <span>SMS - Dashboard</span>
                            <hr></hr>
                            <p>{infos.systemSetting.copyRight}</p>
                        </div>
                    </div>
                </div>
                <div className="DashBoard-Sidebar_Header_NavLinks">
                    <ul className="DashBoard-Sidebar_Header_NavLinks_Ul">
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/overview'}>
                            <span>لوحة التحكم</span>
                            <i className="fa-solid fa-chart-simple"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/setting'}>
                            <span>الإعدادات</span>
                            <i className="fa-solid fa-gear"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/manage_media'}>
                            <span>التواصل الإجتماعي</span>
                            <i className="fa-solid fa-bullhorn"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/accounts'}>
                            <span>حسابات المستخدمين</span>
                            <i className="fa-solid fa-users"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/workers'}>
                            <span>الموظفون</span>
                            <i className="fa-solid fa-address-card"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/teachers'}>
                            <span>المعلمون</span>
                            <i className="fa-solid fa-graduation-cap"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/financial_accounts'}>
                            <span>الحسابات المالية</span>
                            <i className="fa-solid fa-sack-dollar"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/financial_receipts'}>
                            <span>الفواتير المالية</span>
                            <i className="fa-solid fa-sack-dollar"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/classes'}>
                            <span>الفصول</span>
                            <i className="fa-solid fa-book-open-reader"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/all_exams'}>
                            <span>جميع الأختبارات</span>
                            <i className="fa-solid fa-clipboard-question"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/grades'}>
                            <span>الدرجات</span>
                            <i className="fa-solid fa-certificate"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/exam_solutions'}>
                            <span>حلول الأختبارات</span>
                            <i className="fa-solid fa-clipboard-question"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/reports'}>
                            <span>البلاغات</span>
                            <i className="fa-solid fa-file-lines"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/message'}>
                            <span>الرسائل</span>
                            <i className="fa-solid fa-envelope"></i>
                            </NavLink>
                        </li>
                        <li className="DashBoard-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/dashboard/notes'}>
                            <span>ملاحظات</span>
                            <i className="fa-solid fa-note-sticky"></i>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )

};



export default Sidebar;
