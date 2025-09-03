import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { json, useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { accountSetting, editSystemSetting } from "../state/settingSlice";
import { makeAlert } from '../state/alertSlice';


import imageSave from "../images/save.png";


// Components

function DashboardContentOverview(){

    let dispatch = useDispatch();;
    const infos = useSelector( (state) => state.infos );
    let usernameRef = useRef();
    let nameRef = useRef();
    let passwordRef = useRef();
    let CopyRightMessageRef = useRef();
    let SystemNameRef = useRef();
    let PageTitleRef = useRef();


    useEffect(() => {
        dispatch(changeHeaderPath("الإعدادات"));
    }, [dispatch]);
    
    
    function SubmitForm(e){
        e.preventDefault();
        

        console.log(JSON.parse(localStorage.getItem("user")));

        // if(!(usernameRef.current.value == "" || nameRef.current.value == "" || passwordRef.current.value == "")){

            let accountSelected = infos.accounts.value[0].filter( (acc, index) => {
                return acc.username === JSON.parse(localStorage.getItem("user")).username;
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

            dispatch(editSystemSetting(
                {
                    id: 1,
                    copyRight: CopyRightMessageRef?.current?.value || infos?.systemSetting?.copyRight || "© 2023 Information Technology School. All rights reserved",
                    systemName:  SystemNameRef?.current?.value || infos?.systemSetting?.systemName || "Information Technology School",
                    pageTitle: PageTitleRef?.current?.value || infos?.systemSetting?.pageTitle || "Information Technology School"
                }
            ));

            CopyRightMessageRef.current.value = "";
            SystemNameRef.current.value = "";
            PageTitleRef.current.value = "";
            window.location.reload();

    }

    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Setting">
                    <form action="">
                        <h1>إعدادات الحساب</h1>
                        <div className="DashBoard-Content_Overview_Setting_Group">
                            <label htmlFor="username">أسم الحساب</label>
                            <input ref={usernameRef} type="text" name='username'/>
                            <label htmlFor="name">أسم المستخدم</label>
                            <input ref={nameRef} type="text" name='name'/>
                            <label htmlFor="password">كلمة المرور</label>
                            <input ref={passwordRef} type="text" name='password'/>
                        </div>
                        <h1>إعدادات النظام</h1>
                        <div className="DashBoard-Content_Overview_Setting_Group">
                            <label htmlFor="copyRightMessage">رسالة حقوق الملكية</label>
                            <input ref={CopyRightMessageRef} type="text" name='copyRightMessage'/>
                            <label htmlFor="SystemName">أسم النظام</label>
                            <input ref={SystemNameRef} type="text" name='SystemName'/>
                            <label htmlFor="PageTitle">عنوان صفحة النظام</label>
                            <input ref={PageTitleRef} type="text" name='PageTitle'/>
                        </div>
                        <div className="DashBoard-Content_Overview_Setting_Control">
                            <button className='imageBtn' onClick={(e) => {SubmitForm(e)}}>
                                <img alt="" style={{"height": "19px", "width": "19px"}} src={imageSave}/>حفظ</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

};



export default DashboardContentOverview;
