import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, createGrades } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createAccount.css';
import { createWorker, deleteWorker } from '../state/makeSlice';
import { accountSetting } from '../state/settingSlice';

import imageAdd from "../images/add.png";

// import './dashboard.css';

// Components

function DashboardContentGrades(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(changeHeaderPath("الدرجات"));
    }, [dispatch]);

    
    let usernameRef = useRef();
    let subjectRef = useRef();
    let dateRef = useRef();
    let currentGradeRef = useRef();
    let maxGradeRef = useRef();

    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(usernameRef.current.value == "" || subjectRef.current.value == "" || currentGradeRef.current.value == "" || maxGradeRef.current.value == "")){
            

                let accountSelected = infos?.accounts?.value[0].filter( (acc, index) => {
                    return acc?.username === usernameRef.current.value;
                });
    

                if(accountSelected?.length <= 0){
                    dispatch(makeAlert({message: ".هذا الحساب غير موجود. من فضلك أدخل أسم حساب صحيح", display: true}));
                }else{

                    let oldAccountObject = {...accountSelected[0], grades: [...accountSelected[0].grades,
                        {
                            username: usernameRef.current.value,
                            date: dateRef.current.value || DateNow,
                            subject: subjectRef.current.value,
                            currentGrade: currentGradeRef.current.value,
                            maxGrade: maxGradeRef.current.value
                        }
                    ]}

                    dispatch(accountSetting(
                        {
                            id: accountSelected[0].id,
                            value: oldAccountObject
                        }
                    ));
    
                    usernameRef.current.value = "";
                    subjectRef.current.value = "";
                    currentGradeRef.current.value = "";
                    maxGradeRef.current.value = "";
                    dateRef.current.value = "";

                }


    
                // console.log(oldAccountObject)
    
                // let authItem = {...oldAccountObject, auth: "true"};
                
                // console.log(authItem)
    
                // localStorage.setItem('user', JSON.stringify(authItem));
                
                // console.log(oldAccountObject)
            
                // dispatch(accountSetting(
                //     {
                //         id: accountSelected[0].id,
                //         value: oldAccountObject
                //     }
                // ));

                // usernameRef.current.value = "";
                // subjectRef.current.value = "";
                // currentGradeRef.current.value = "";
                // maxGradeRef.current.value = "";
                // dateRef.current.value = "";

                // window.location.reload();

                // if(checkTheSameAccount?.length > 0){
                //     dispatch(makeAlert({message: "Grades for that month have already been recorded.", display: true}));
                // }else{

                //         dispatch(createGrades({
                //             username: usernameRef.current.value,
                //             date: dateRef.current.value || DateNow,
                //             subject: subjectRef.current.value,
                //             currentGrade: currentGradeRef.current.value,
                //             maxGrade: maxGradeRef.current.value
                //         }))
                // }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Accounts_CreateAccount">
                        <form action="">
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Group">
                                <label htmlFor="Name">أسم حساب المستخدم</label>
                                <input ref={usernameRef} type="text" name='Name'/>
                                <label htmlFor="job">أسم المادة</label>
                                <input ref={subjectRef} type="text" name='job'/>
                                <label htmlFor="job">التاريخ</label>
                                <input ref={dateRef} type="text" name='job'/>
                                <label htmlFor="job">الدرجة الحاصل عليها</label>
                                <input ref={currentGradeRef} type="text" name='job'/>
                                <label htmlFor="job">الدرجة النهائية</label>
                                <input ref={maxGradeRef} type="text" name='job'/>
                            </div>
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Control">
                                <button className='addBtn' onClick={(e) => { createBtn(e) }}>
                                    <img alt="" style={{"height": "26px", "width": "25px"}} src={imageAdd}/>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentGrades;






