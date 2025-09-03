import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoExams, changeHeaderPath, deleteExam, getExamSolution, deleteExamSolution } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/reportsTable.css'

import imageDetails from "../images/details.png";
import imageBin from "../images/bin2.png";


function DashboardContentExamSolutions(){


    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("حلول الأختبارات"));
        dispatch(getExamSolution());
    }, [dispatch]);



    function DeleteBtn(e, v){
        e.preventDefault();
        // console.log(v)
        dispatch(deleteExamSolution(v.id));
        window.location.reload();
    }

    function ShowBtn(e, v){
        e.preventDefault();
        navigate(`/dashboard/show_exam_solution`, {replace: true});
        localStorage.setItem("ShowExamSol", JSON.stringify(v));   
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
                                        <th scope="col">Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Class Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            infos?.examSolution.map((s, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{s.id}</th>
                                                        <th scope="row">{s.name}</th>
                                                        <th scope="row">{s.username}</th>
                                                        <th scope="row">{s.classExam}</th>
                                                        <th scope="row">{s.date}</th>
                                                        <td className='control_buttons'>
                                                            <button className='imageBtn deleteBtn' onClick={(e) => {DeleteBtn(e, s)}}>
                                                                <img alt="" src={imageBin} style={{"height": "18px", "width": "18px"}}/>Delete</button>
                                                            <button className='imageBtn' onClick={(e) => { ShowBtn(e, s) }}>
                                                                <img alt="" src={imageDetails} style={{"height": "18px", "width": "18px"}}/>Show</button>
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



export default DashboardContentExamSolutions;






