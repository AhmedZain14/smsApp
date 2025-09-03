import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createAccount.css';
import { createAccount } from '../state/makeSlice';

import imageCreateAccount from "../images/plus.png";

// import './dashboard.css';

// Components

function DashboardContentAccountsCreate(){

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert, loading} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("حسابات المستخدمين / إنشاء حساب جديد"));
    }, [dispatch]);

    
    let usernameRef = useRef();
    let nameRef = useRef();
    let passwordRef = useRef();
    let roleRef = useRef();
    let stageRef = useRef();
    let parentStudentRef = useRef();

    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(usernameRef.current.value == "" || nameRef.current.value == "" || passwordRef.current.value == "" || roleRef.current.value == "")){


                let checkTheSameAccount = infos.accounts.value[0]?.filter( (acc, index) => {
                    return acc.username === usernameRef.current.value;
                });

                
                if(checkTheSameAccount?.length > 0){
                    dispatch(makeAlert({message: "أسم الحساب هذا موجود بالفعل. قم بإختيار أسم حساب آخر", display: true}));
                }else{

                    if(!(roleRef.current.value.toLowerCase() == "student" || roleRef.current.value.toLowerCase() == "admin" || roleRef.current.value.toLowerCase() == "parent" || roleRef.current.value.toLowerCase() == "teacher")){
                        dispatch(makeAlert({message: "حقل الصلاحية يجب أن يكون طالب أو معلم أو ولي أمر أو مسؤول", display: true}));
                    }else{
                        
                        
                        
                        let checkTheSameClass = infos.classes.value[0]?.filter( (cl, index) => {
                            return `${stageRef.current.value}` === `${cl.class_name.stage}/${cl.class_name.classNumber}`;
                        });
                        

                        if(roleRef.current.value.toLowerCase() == "student"){
                            if(checkTheSameClass?.length > 0 ){
                                dispatch(createAccount(
                                    {
                                        username: usernameRef.current.value.toLowerCase(),
                                        password: passwordRef.current.value.toLowerCase(),
                                        name: nameRef.current.value.toLowerCase(),
                                        active: true,
                                        ban: false,
                                        createDate: DateNow,
                                        role: roleRef.current.value.toLowerCase(),
                                        studentClass: stageRef.current.value || null,
                                        parentStudent: ( (parentStudentRef.current.value.toLowerCase()) ? (parentStudentRef.current.value.toLowerCase()).split(",") : null),
                                        class: {
                                          classes: [],
                                          subject: null
                                        },
                                        grades: [],
                                        privateNotes: [],
                                        adminMessage: []
                                    }
                                ));
                                usernameRef.current.value = "";
                                passwordRef.current.value = "";
                                nameRef.current.value = "";
                                roleRef.current.value = "";
                                parentStudentRef.current.value = "";
                                stageRef.current.value = "";
                            }else{
                                dispatch(makeAlert({message: "الفصل الذي أدخلته غير موجود", display: true}));
                            }
                        }else{
                            dispatch(createAccount(
                                {
                                    username: usernameRef.current.value,
                                    password: passwordRef.current.value.toLowerCase(),
                                    name: nameRef.current.value.toLowerCase(),
                                    active: true,
                                    ban: false,
                                    createDate: DateNow,
                                    role: roleRef.current.value.toLowerCase(),
                                    studentClass: stageRef.current.value || null,
                                    parentStudent: ( (parentStudentRef.current.value.toLowerCase()) ? (parentStudentRef.current.value.toLowerCase()).split(",") : null),
                                    class: {
                                      classes: [],
                                      subject: null
                                    },
                                    grades: [],
                                    privateNotes: [],
                                    adminMessage: []
                                }
                            ));
                            usernameRef.current.value = "";
                            passwordRef.current.value = "";
                            nameRef.current.value = "";
                            roleRef.current.value = "";
                            parentStudentRef.current.value = "";
                            stageRef.current.value = "";
                        }

                        
                        // if(roleRef.current.value.toLowerCase() == "student" && stageRef.current.value !== ""){
                        //     dispatch(createAccount(
                        //         {
                        //             username: usernameRef.current.value.toLowerCase(),
                        //             password: passwordRef.current.value.toLowerCase(),
                        //             name: nameRef.current.value.toLowerCase(),
                        //             active: true,
                        //             ban: false,
                        //             createDate: DateNow,
                        //             role: roleRef.current.value.toLowerCase(),
                        //             studentClass: stageRef.current.value || null,
                        //             parentStudent: ( (parentStudentRef.current.value.toLowerCase()) ? (parentStudentRef.current.value.toLowerCase()).split(",") : null),
                        //             class: {
                        //               classes: [],
                        //               subject: null
                        //             },
                        //             privateNotes: [],
                        //             adminMessage: []
                        //         }
                        //     ));
                        //     usernameRef.current.value = "";
                        //     passwordRef.current.value = "";
                        //     nameRef.current.value = "";
                        //     roleRef.current.value = "";
                        //     parentStudentRef.current.value = "";
                        //     stageRef.current.value = "";
                        // }else{
                        //     dispatch(makeAlert({message: "أدخل فصل الطالب أولاً", display: true}));
                        // }


                        // if(roleRef.current.value.toLowerCase() == "parent" && parentStudentRef.current.value !== ""){
                        //     dispatch(createAccount(
                        //         {
                        //             username: usernameRef.current.value.toLowerCase(),
                        //             password: passwordRef.current.value.toLowerCase(),
                        //             name: nameRef.current.value.toLowerCase(),
                        //             active: true,
                        //             ban: false,
                        //             createDate: DateNow,
                        //             role: roleRef.current.value.toLowerCase(),
                        //             studentClass: stageRef.current.value || null,
                        //             parentStudent: ( (parentStudentRef.current.value.toLowerCase()) ? (parentStudentRef.current.value.toLowerCase()).split(",") : null),
                        //             class: {
                        //               classes: [],
                        //               subject: null
                        //             },
                        //             privateNotes: [],
                        //             adminMessage: []
                        //         }
                        //     ));
                        //     usernameRef.current.value = "";
                        //     passwordRef.current.value = "";
                        //     nameRef.current.value = "";
                        //     roleRef.current.value = "";
                        //     parentStudentRef.current.value = "";
                        //     stageRef.current.value = "";
                        // }else{
                        //     dispatch(makeAlert({message: "أدخل أبناء ولي الأمر، لا تستطيع ترك الحقل فارغاً", display: true}));
                        // }


                        // if(!roleRef.current.value.toLowerCase() == "student" &&  stageRef.current.value !== ""){
                        //     dispatch(makeAlert({message: "!لا تستطيع إضافة الفصل الدراسي، لأن الحساب ليس طالباً", display: true}));
                        // }else if(roleRef.current.value.toLowerCase() == "student" && stageRef.current.value == ""){
                        //     dispatch(makeAlert({message: "أدخل فصل الطالب أولاً", display: true}));
                        // }else if(!roleRef.current.value.toLowerCase() == "parent" &&  parentStudentRef.current.value !== ""){
                        //     dispatch(makeAlert({message: "!لا تستطيع إضافة أبناء ولي الأمر، لأن الحساب ليس ولي أمر", display: true}));
                        // }else{
                        //     dispatch(createAccount(
                        //         {
                        //             username: usernameRef.current.value.toLowerCase(),
                        //             password: passwordRef.current.value.toLowerCase(),
                        //             name: nameRef.current.value.toLowerCase(),
                        //             active: true,
                        //             ban: false,
                        //             createDate: DateNow,
                        //             role: roleRef.current.value.toLowerCase(),
                        //             studentClass: stageRef.current.value || null,
                        //             parentStudent: ( (parentStudentRef.current.value.toLowerCase()) ? (parentStudentRef.current.value.toLowerCase()).split(",") : null),
                        //             class: {
                        //               classes: [],
                        //               subject: null
                        //             },
                        //             privateNotes: []
                        //         }
                        //     ));
                        //     usernameRef.current.value = "";
                        //     passwordRef.current.value = "";
                        //     nameRef.current.value = "";
                        //     roleRef.current.value = "";
                        //     parentStudentRef.current.value = "";
                        //     stageRef.current.value = "";
                        // }
                        // window.location.reload();

                    }
                    
                }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function showBtn(e, id){
        e.preventDefault();
        navigate(`/dashboard/accounts/show`, {replace: true});
        localStorage.setItem("ShowAccount", JSON.stringify(id));
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Accounts_CreateAccount">
                        <form action="">
                            {/* <h1>إنشاء حساب جديد</h1> */}
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Group">
                                <label htmlFor="Username">أسم الحساب</label>
                                <input ref={usernameRef} type="text" name='Username'/>
                                <label htmlFor="Name">أسم المستخدم</label>
                                <input ref={nameRef} type="text" name='Name'/>
                                <label htmlFor="Password">كلمة المرور</label>
                                <input ref={passwordRef} type="text" name='Password'/>
                                {/* <label htmlFor="file">رفع صورة</label>
                                <input type="file" name='file' accept="image/png, image/jpeg"/> */}
                                <label htmlFor="Role">الصلاحية</label>
                                <input ref={roleRef} type="text" name='Role'/>
                                <label htmlFor="Stage">الفصل الدراسي (طالب)</label>
                                <input ref={stageRef} type="text" name='Stage'/>
                                <label htmlFor="Parent">(Username1,Username2,...) حسابات أبناء ولي الأمر</label>
                                <input ref={parentStudentRef} type="text" name='Parent'/>
                                {/* <div className="inputGroup">
                                    <div>
                                        <input type="checkbox" name="favorite_pet" value="1/1"/>
                                        <label htmlFor="favorite_pet">1/1</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="favorite_pet" value="1/1"/>
                                        <label htmlFor="favorite_pet">1/2</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="favorite_pet" value="1/3"/>
                                        <label htmlFor="favorite_pet">1/3</label>
                                    </div>   
                                </div> */}
                            </div>
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Control">
                                <button className='addBtn' onClick={(e) => {createBtn(e)}}>
                                <img alt="" style={{"height": "20px", "width": "20px"}} src={imageCreateAccount}/>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentAccountsCreate;
