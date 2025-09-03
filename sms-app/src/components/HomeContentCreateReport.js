import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import {  } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/dashboardMessage.css';
import { createAdminMessage } from '../state/adminMessageSlice';
import { createReport } from '../state/makeSlice';


// import './dashboard.css';

// Components

function HomeContentCreateReport(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("التواصل مع الإدارة"));
    }, [dispatch]);

    let userLogin = JSON.parse(localStorage.getItem('user'));
    
    let ReportTypeRef = useRef();
    let ReportTitle = useRef();
    let ReportDesRef = useRef();

    function sendBtn(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(ReportTypeRef.current.value == "" || ReportTitle.current.value == "" || ReportDesRef.current.value == "")){
            

            dispatch(createReport({
                title: ReportTitle.current.value,
                des: ReportDesRef.current.value,
                type: ReportTypeRef.current.value,
                status: "pending",
                createDate: DateNow,
                by: `${userLogin?.username} (${userLogin?.name})`
            }));

            ReportTypeRef.current.value = "";
            ReportTitle.current.value = "";
            ReportDesRef.current.value = ""
            // window.location.reload();
        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }
    
    return (
        <> 
            <div className="Home-Content_Overview">
                <div className="Home-Content_Overview_Message">
                    <div className="Home-Content_Overview_Message_CreateMessage">
                        <form action="">
                            {/* <h1>Create Post</h1> */}
                            <div className="Home-Content_Overview_Message_CreateMessage_Group">
                                <label htmlFor="ReportType">رفع شكوى على ( طالب، مُعلم، غير ذلك .. )</label>
                                <input ref={ReportTypeRef} type="text" name='ReportType'/>
                                <label htmlFor="ReportTitle">عنوان التقرير</label>
                                <input ref={ReportTitle} type="text" name='ReportTitle'/>
                                <label htmlFor="ReportDes">محتوى التقرير</label>
                                <textarea ref={ReportDesRef} type="text" name='ReportDes'/>
                            </div>
                            <div className="Home-Content_Overview_Message_CreateMessage_Control">
                                <button onClick={(e) => {sendBtn(e)}}>إرسال</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default HomeContentCreateReport;
