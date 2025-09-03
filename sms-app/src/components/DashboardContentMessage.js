import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import {  } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/dashboardMessage.css';
import { createAdminMessage } from '../state/adminMessageSlice';


// import './dashboard.css';

// Components

function DashboardContentMessage(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("رسائل الإدارة للمستخدمين"));
    }, [dispatch]);

    
    let usernameRef = useRef();
    let messageTitleRef = useRef();
    let messageContentRef = useRef();

    function sendBtn(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(usernameRef.current.value == "" || messageTitleRef.current.value == "" || messageContentRef.current.value == "")){
            
            let accountSelected = infos.accounts.value[0].filter( (acc, index) => {
                return acc.username === usernameRef.current.value;
            });

            if(accountSelected.length > 0){
                let oldAdminMessages = [...accountSelected[0].adminMessage]
                
                let oldAccountObject = {...accountSelected[0]}
    
                oldAccountObject.adminMessage = [...oldAdminMessages, {
                                title: messageTitleRef.current.value,
                                des: messageContentRef.current.value,
                                date: DateNow
                            }];
                // console.log(oldAccountObject)
                dispatch(createAdminMessage({
                    id: accountSelected[0].id,
                    value: oldAccountObject
                }));
                usernameRef.current.value = "";
                messageTitleRef.current.value = "";
                messageContentRef.current.value = ""
                // window.location.reload();
            }else{
                dispatch(makeAlert({message: ".هذا الحساب غير صحيح", display: true}));
            }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Message">
                    <div className="DashBoard-Content_Overview_Message_CreateMessage">
                        <form action="">
                            {/* <h1>Create Post</h1> */}
                            <div className="DashBoard-Content_Overview_Message_CreateMessage_Group">
                                <label htmlFor="username">أسم الحساب ( المُرسل إليه )</label>
                                <input ref={usernameRef} type="text" name='username'/>
                                <label htmlFor="messageTitle">عنوان الرسالة</label>
                                <input ref={messageTitleRef} type="text" name='messageTitle'/>
                                <label htmlFor="messageContent">محتوى الرسالة</label>
                                <textarea ref={messageContentRef} type="text" name='messageContent'/>
                            </div>
                            <div className="DashBoard-Content_Overview_Message_CreateMessage_Control">
                                <button onClick={(e) => {sendBtn(e)}}>إرسال</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentMessage;
