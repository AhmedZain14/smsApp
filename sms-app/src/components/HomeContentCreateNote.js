import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import {  } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/homeContentCreateNote.css';
import { createPrivateNote } from '../state/makeSlice';


import imageSave from "../images/save.png";


// Components

function HomeContentCreateNote(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("إنشاء ملاحظة"));
    }, [dispatch]);
    
    
    const [AccountSele, setAccountSele] = useState();
    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        let selectedAccount = infos?.accounts?.value[0]?.filter((acc, index) => {
            return acc?.username === userLogin?.username
        })

        setAccountSele(selectedAccount);
       
    }, [infos.accounts.value]);
    
    let notesTitleRef = useRef();
    let noteContentRef = useRef();

    function createBtn(e){
        e.preventDefault();

        // if(!(notesTitleRef.current.value == "" || noteContentRef.current.value == "")){

        //     let newObjectAccount = AccountSele[0];

        //     newObjectAccount = {
        //         ...AccountSele[0],
        //         privateNotes: [
        //         ...AccountSele[0].privateNotes,
        //         {
        //             disappear: true,
        //             title: notesTitleRef.current.value,
        //             des: noteContentRef.current.value
        //         }]
        //     }

        //     // console.log(AccountSele[0]);
        //     // console.log(newObjectAccount);

        //     dispatch(createPrivateNote(
        //         {
        //          ...newObjectAccount
        //         }
        //     ));

        //     notesTitleRef.current.value = '';
        //     noteContentRef.current.value = '';
        //     window.location.reload();

        // }else{
        //     dispatch(makeAlert({message: "There is field empty!", display: true}));
        // }

        if(!(notesTitleRef.current.value == "" || noteContentRef.current.value == "")){

            let newObjectAccount = AccountSele[0];


            // console.log(AccountSele[0]);
            // console.log(newObjectAccount);

            dispatch(createPrivateNote(
                {
                    username: userLogin?.username,
                    disappear: true,
                    title: notesTitleRef.current.value,
                    des: noteContentRef.current.value
                }
            ));

            notesTitleRef.current.value = '';
            noteContentRef.current.value = '';
            // window.location.reload();

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }
    
    return (
        <> 
            <div className="Home-Content_Overview">
                <div className="Home-Content_Overview_Notes">
                    <div className="Home-Content_Overview_Notes_CreateNotes">
                        <form action="">
                            {/* <h1>Create Post</h1> */}
                            <div className="Home-Content_Overview_Notes_CreateNotes_Group">
                                <label htmlFor="notesTitle">عنوان الملاحظة</label>
                                <input ref={notesTitleRef} type="text" name='notesTitle'/>
                                <label htmlFor="noteContent">محتوى الملاحظة</label>
                                <textarea ref={noteContentRef} type="text" name='noteContent'/>
                            </div>
                            <div className="Home-Content_Overview_Notes_CreateNotes_Control">
                                <button className='imageBtn' onClick={(e) => {createBtn(e)}}>
                                    <img alt="" style={{"height": "19px", "width": "19px"}} src={imageSave}/>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default HomeContentCreateNote;
