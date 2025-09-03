import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate   } from "react-router-dom";
import './dashboard.css';
import './alertMessage.css';

import paperImg from '../images/paper.png';

// Components
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import { deleteNote, deleteNotes, fetchNotes, NoteSelected } from '../state/notesSlice';
import { makeAlert } from '../state/alertSlice';
import { getInfoSystemSetting } from '../state/infoSlice';




function Dashboard(){

    useEffect( () => {
        document.body.style.backgroundColor = "#F7F8FB";
    }, []);  

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const {account} = useSelector( (state) => state.login );
    const {notes, loading, idOfNoteSelected} = useSelector( (state) => state.notes );
    let [NoteItemSelected, setNoteItemSelected] = useState();
    const {alert} = useSelector( (state) => state.alerts );


    useEffect( () => {
        if(account){
            if(account.role !== "admin"){
                navigate("/", {replace: true});
            }
        }else{
            navigate("/login", {replace: true});
        }
    }, [account, navigate]); 

    useEffect( () => {
        dispatch(fetchNotes());
        dispatch(getInfoSystemSetting());
    }, [dispatch]);

    useEffect( () => {
        notes[0]?.forEach((item) => {
            // console.log("mappp:", item)
            // console.log(idOfNoteSelected.idNote);
            if( item.id === parseInt(idOfNoteSelected.idNote) ){
                setNoteItemSelected(item);
            }
        })
    }, [notes, idOfNoteSelected]);

    return (
        <> 
            <div className="dashboard-container">
                {
                    (idOfNoteSelected.disappear === true ) ? "" : (
                        <div className="dashboard-container_Note">
                            <div key={NoteItemSelected?.id} className="note">
                                <img alt="" src={paperImg} />
                                <span>{NoteItemSelected?.title}</span>
                                <p>{NoteItemSelected?.des}</p>
                                <button onClick={() => { dispatch(NoteSelected({disappear: true, idNote: null}))}}>Close</button>
                                <button onClick={() => { 
                                    dispatch(deleteNote(NoteItemSelected?.id));
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
                <DashboardContent />
                <Sidebar/>
            </div>
        </>
    )

};



export default Dashboard;
