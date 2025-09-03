import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import userAccountImg from '../images/person.jpg';
import { makeAlert } from '../state/alertSlice';
import { accountEdit } from '../state/infoSlice';
import { deleteNote, NoteSelected } from '../state/notesSlice';

import paperImg from '../images/paper.png';

// ComponentsW
import DashboardContentBody from './DashboardContentBody';
import HomeContentBody from './HomeContentBody';
import HomeContentHeader from './HomeContentHeader';
import { deletePrivateNote } from '../state/makeSlice';

// style={{color: 'red'}}

function HomeContent(){

    let dispatch = useDispatch();
    const {account} = useSelector( (state) => state.login );
    const infos = useSelector( (state) => state.infos );
    const {notes, loading, idOfNoteSelected} = useSelector( (state) => state.notes );
    let [NoteItemSelected, setNoteItemSelected] = useState(null);
    const [AccountSelected, setAccountSelected] = useState();
    const {alert} = useSelector( (state) => state.alerts );
    const [NewAccountObject, setNewAccountObject] = useState();

    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect( () => {

        let accountSelected = infos?.accounts?.value[0]?.find( (i) => {
            return i?.username === userLogin?.username
        })

        setAccountSelected(accountSelected);

    }, [infos.accounts.value]);


    useEffect( () => {
        infos?.privateNotes?.value[0]?.forEach((item, index) => {
            if( item.id === parseInt(idOfNoteSelected.idNote) ){
                setNoteItemSelected(item);
            }
        })
    }, [infos?.privateNotes, idOfNoteSelected]);



    return (
        <>
            {
            (idOfNoteSelected?.disappear === true) ? "" : (
            <div className="home-container_Note">
                <div key={NoteItemSelected?.id} className="note">
                    <img alt="" src={paperImg} />
                    <span>{NoteItemSelected?.title}</span>
                    <p>{NoteItemSelected?.des}</p>
                    <button onClick={(e) => {dispatch(NoteSelected({disappear: true, idNote: null}))}}>Close</button>
                    <button onClick={() => { 
                        dispatch(deletePrivateNote(NoteItemSelected?.id));
                        dispatch(NoteSelected({disappear: true, idNote: null}));
                        window.location.reload();
                    }}>Delete</button>
                </div>
            </div>
            )
            }


            {
            (alert.display) ? (
            <div className="dashboard-container_Alert">
                <div className="alert">
                    <span><i className="fa-solid fa-triangle-exclamation"></i></span>
                    <p>{alert.message}</p>
                    <button onClick={() => { dispatch(makeAlert({message: null, display: false}))}}>Close</button>
                </div>
            </div>
            ) : ""
            }
            <div className="Home-Content">
                {<HomeContentHeader />}
                {<HomeContentBody />}
            </div>
        </>
    )

};



export default HomeContent;
