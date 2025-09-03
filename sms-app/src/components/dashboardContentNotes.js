import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import {  } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/adminNotes.css';
import { createNote } from '../state/makeSlice';


import imageSave from "../images/add.png";


// Components

function DashboardContentNotes(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الملاحظات"));
    }, [dispatch]);

    
    let notesTitleRef = useRef();
    let noteContentRef = useRef();

    function createBtn(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(notesTitleRef.current.value == "" || noteContentRef.current.value == "")){
        
            dispatch(createNote(
                {
                    disappear: true,
                    title: notesTitleRef.current.value,
                    des: noteContentRef.current.value
                }
            ));

            notesTitleRef.current.value = "";
            noteContentRef.current.value = "";

            // window.location.reload();

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Notes">
                    <div className="DashBoard-Content_Overview_Notes_CreateNotes">
                        <form action="">
                            {/* <h1>Create Post</h1> */}
                            <div className="DashBoard-Content_Overview_Notes_CreateNotes_Group">
                                <label htmlFor="notesTitle">عنوان الملاحظة</label>
                                <input ref={notesTitleRef} type="text" name='notesTitle'/>
                                <label htmlFor="noteContent">محتوى الملاحظة</label>
                                <textarea ref={noteContentRef} type="text" name='noteContent'/>
                            </div>
                            <div className="DashBoard-Content_Overview_Notes_CreateNotes_Control">
                                <button className='imageBtn addBtn' onClick={(e) => {createBtn(e)}}>
                                    <img alt="" style={{"height": "22px", "width": "22px"}} src={imageSave}/>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentNotes;
