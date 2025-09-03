import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, NavLink } from "react-router-dom";
import image1 from '../images/imagepost2.jpg';
import { getInfoSystemSetting } from '../state/infoSlice';


function HomeSidebar(){

    let dispatch = useDispatch();
    const {account} = useSelector( (state) => state.login );
    const infos = useSelector( (state) => state.infos );
    const [TeacherSelected, setTeacherSelected] = useState([]);

    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect( () => {
        dispatch(getInfoSystemSetting());
    }, [dispatch]);

    useEffect( () => {

        let teacherSelected = infos?.teachers?.ActiveTeachers?.filter( (te) => {
            return te.username === userLogin?.username
        })

        setTeacherSelected({...teacherSelected})
        
        // console.log({...teacherSelected}["0"]?.classes)

    }, [infos.teachers.ActiveTeachers, userLogin.username]);

    function SelectClassTeacher(e, v){
        e.preventDefault();
        localStorage.setItem("teacherClassSelected", JSON.stringify(v));
    }

    return (
        <>
            <div className="Home-Sidebar">
                <div className="Home-Sidebar_Header">
                    <div className="Home-Sidebar_Header_Content">
                        {/* <img src={image1} alt="" /> */}
                        <div className="image">
                            
                        </div>
                        <div className="text">
                            <span>SMS</span>
                            <hr></hr>
                            <p>{infos.systemSetting.copyRight}</p>
                        </div>
                    </div>
                </div>
                <div className="Home-Sidebar_Header_NavLinks">
                    <ul className="Home-Sidebar_Header_NavLinks_Ul">
                        {
                            (userLogin?.active === false) ? (
                                <>
                                <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                                    <NavLink to={'/home/overview'}>
                                    <span>الصفحة الرئيسية</span>
                                    <i className="fa-solid fa-house"></i>
                                    </NavLink>
                                </li>
                                <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                                    <NavLink to={'/home/create_report'}>
                                    <span>التواصل مع الإدارة</span>
                                    <i className="fa-solid fa-file-signature"></i>
                                    </NavLink>
                                </li>
                                </>
                            ) : (
                                
                                <>
                                <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/overview'}>
                            <span>الصفحة الرئيسية</span>
                            <i className="fa-solid fa-house"></i>
                            </NavLink>
                        </li>
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/posts'}>
                            <span>الأخبار</span>
                            <i className="fa-solid fa-bullhorn"></i>
                            </NavLink>
                        </li>
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/account_setting'}>
                            <span>إعدادات الحساب</span>
                            <i className="fa-solid fa-gear"></i>
                            </NavLink>
                        </li>
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/create_report'}>
                            <span>التواصل مع الإدارة</span>
                            <i className="fa-solid fa-file-signature"></i>
                            </NavLink>
                        </li>
                        {
                            (userLogin?.role !== "student") ? "" : (
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/class_exam'}>
                            <span>إختبار الفصل</span>
                            <i className="fa-solid fa-clipboard-question"></i>
                            </NavLink>
                        </li>
                            )
                        }
                        {
                            (userLogin?.role !== "student") ? "" : (
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                                <NavLink to={'/home/grades'}>
                                <span>الدرجات</span>
                                <i className="fa-solid fa-certificate"></i>
                                </NavLink>
                        </li>
                            )
                        }
                        {
                            (userLogin?.role !== "student") ? "" : (
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/student_class'}>
                            <span>الفصل الدراسي: {userLogin?.studentClass}</span>
                            <i className="fa-solid fa-book-open-reader"></i>
                            </NavLink>
                        </li>
                            )
                        }
                        {
                            (userLogin?.role !== "parent") ? "" : (
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                                <NavLink to={'/home/my_student_grades'}>
                                <span>درجات الأبناء</span>
                                <i className="fa-solid fa-certificate"></i>
                                </NavLink>
                        </li>
                            )
                        }
                        {
                        // console.log(TeacherSelected["0"]?.classes)
                            (userLogin?.role !== "teacher") ? "" : (
                                TeacherSelected["0"]?.classes?.map((e, i) => {
                                    return (
                                        <li key={i} onClick={(event) => {SelectClassTeacher(event, e)}} className="Home-Sidebar_Header_NavLinks_Ul_Li">
                                            <NavLink to={'/home/student_class'}>
                                            <span>الفصل الدراسي: {e}</span>
                                            <i className="fa-solid fa-book-open-reader"></i>
                                            </NavLink>
                                        </li>
                                    )
                                })
                            )
                        }
                        {
                            (userLogin?.role !== "teacher") ? "" : (
                        <li className="Home-Sidebar_Header_NavLinks_Ul_Li">
                            <NavLink to={'/home/create_exam'}>
                            <span>إنشاء أختبار</span>
                            <i className="fa-solid fa-clipboard-question"></i>
                            </NavLink>
                        </li>
                            )
                        }
                                </>
                                
                            )
                        }
                    
                    </ul>
                </div>
            </div>
        </>
    )

};



export default HomeSidebar;
