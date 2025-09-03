import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
// Components




function DashboardContentCamera(){

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeHeaderPath("كاميرات المراقبة"));
    }, [])

    return (
        <> 
            <div className="DashBoard-Content_Overview">                
                
            </div>
        </>
    )

};



export default DashboardContentCamera;
