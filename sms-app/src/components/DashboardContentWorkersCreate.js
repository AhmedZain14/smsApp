import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createAccount.css';
import { createWorker, deleteWorker } from '../state/makeSlice';

import imageCreateAccount from "../images/plus.png";


// import './dashboard.css';

// Components

function DashboardContentWorkersCreate(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الموظفون / تسجيل موظف جديد"));
    }, [dispatch]);

    
    let nameRef = useRef();
    let jobRef = useRef();

    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(nameRef.current.value == "" || jobRef.current.value == "")){

                let checkTheSameAccount = infos.workers.value[0]?.filter( (acc, index) => {
                    return acc.name === nameRef.current.value;
                });
                
                // let checkAccountAvailable = infos.accounts.value[0]?.filter( (acc, index) => {
                //     return acc.username === usernameRef.current.value;
                // });


                if(checkTheSameAccount?.length > 0){
                    dispatch(makeAlert({message: "هذا الحساب تمت إضافته من قبل. لا يمكن إضافته مرة أخرى", display: true}));
                }else{
                        dispatch(createWorker(
                            {
                                name: nameRef.current.value.toLowerCase(),
                                job: jobRef.current.value.toLowerCase(),
                                dateOfHiring: DateNow
                            }
                        ));
                        nameRef.current.value = "";
                        jobRef.current.value = "";
                        // window.location.reload();
                }



        }else{
            dispatch(makeAlert({message: "ّ!هناك حقل فارغ", display: true}));
        }

    }

    function deleteBtn(v){
        dispatch(deleteWorker(v));
        window.location.reload();
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Accounts_CreateAccount">
                        <form action="">
                            {/* <h1>تسجيل موظف جديد</h1> */}
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Group">
                                <label htmlFor="Name">أسم المستخدم</label>
                                <input ref={nameRef} type="text" name='Name'/>
                                <label htmlFor="job">نوع الوظيفة</label>
                                <input ref={jobRef} type="text" name='job'/>
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
                                <img alt="" style={{"height": "20px", "width": "20px"}} src={imageCreateAccount}/>تسجيل</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentWorkersCreate;






