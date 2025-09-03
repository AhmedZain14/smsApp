import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { json, useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { accountSetting, editSystemSetting } from "../state/settingSlice";
import { makeAlert } from '../state/alertSlice';

import '../pages/home.css'

// import './dashboard.css';

// Components

function HomeContentSetting(){

    let dispatch = useDispatch();;
    const infos = useSelector( (state) => state.infos );
    let usernameRef = useRef();
    let nameRef = useRef();
    let passwordRef = useRef();


    useEffect(() => {
        dispatch(changeHeaderPath("إعدادات الحساب"));
    }, [dispatch]);
    
    
    function SubmitForm(e){
        e.preventDefault();

        // console.log(JSON.parse(localStorage.getItem("user")));

        // if(!(usernameRef.current.value == "" || nameRef.current.value == "" || passwordRef.current.value == "")){

            let accountSelected = infos?.accounts?.value[0].filter( (acc, index) => {
                return acc?.username === JSON.parse(localStorage.getItem("user")).username;
            });

            let oldAccountObject = {...accountSelected[0]}

            // console.log(oldAccountObject)

            // console.log(oldAccountObject.username)

            // console.log(usernameRef.current.value)

            oldAccountObject.username = usernameRef.current.value || oldAccountObject.username;
            oldAccountObject.name = nameRef.current.value || oldAccountObject.name;
            oldAccountObject.password = passwordRef.current.value || oldAccountObject.password;

            let authItem = {...oldAccountObject, auth: "true"};
            
            console.log(authItem)

            localStorage.setItem('user', JSON.stringify(authItem));
            
            console.log(oldAccountObject)
        
            dispatch(accountSetting(
                {
                    id: accountSelected[0].id,
                    value: oldAccountObject
                }
            ));

            usernameRef.current.value = "";
            nameRef.current.value = "";
            passwordRef.current.value = "";
            window.location.reload();
        // }

    }

    return (
        <> 
            <div className="Home-Content_Overview">
                <div className="Home-Content_Overview_Setting">
                    <form action="">
                        <h1>إعدادات الحساب</h1>
                        <div className="Home-Content_Overview_Setting_Group">
                            {/* <label htmlFor="username">أسم الحساب</label>
                            <input ref={usernameRef} type="text" name='username'/>
                            <label htmlFor="name">أسم المستخدم</label>
                            <input ref={nameRef} type="text" name='name'/> */}
                            <label htmlFor="password">كلمة المرور</label>
                            <input ref={passwordRef} type="text" name='password'/>
                        </div>
                        <div className="Home-Content_Overview_Setting_Control">
                            <button onClick={(e) => {SubmitForm(e)}}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

};



export default HomeContentSetting;
