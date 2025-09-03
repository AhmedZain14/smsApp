import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoExams, changeHeaderPath, deleteExam } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/reportsTable.css'

import imageBin from "../images/bin2.png";
import imageAddPost from "../images/add.png";


function DashboardContentExams(){


    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("جميع الأختبارات"));
        dispatch(getInfoExams());
    }, [dispatch]);



    function DeleteBtn(e, v){
        e.preventDefault();
        dispatch(deleteExam(v));
        window.location.reload();
    }


    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Reports">
                    <div className="DashBoard-Content_Overview_Reports_ReportsTable">
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Class Name</th>
                                        <th scope="col">By</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            infos.exams.map((ex, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{ex.id}</th>
                                                        <th scope="row">{ex.className}</th>
                                                        <th scope="row">{ex.by}</th>
                                                        <th className='tableUniqueSpan' scope="row" style={{"textTransform": "capitalize"}}>
                                                            <span>
                                                                {ex.subjectName}
                                                            </span>
                                                        </th>
                                                        <th scope="row">{ex.date}</th>
                                                        <td>
                                                            <button className='deleteBtn' onClick={(e) => { DeleteBtn(e, ex) }}>
                                                                <img alt="" src={imageBin}/>Delete</button>
                                                        </td>
                                                    </tr>
                                                    )})
                                    ) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentExams;






