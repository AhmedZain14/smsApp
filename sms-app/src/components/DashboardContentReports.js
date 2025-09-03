import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/reportsTable.css'


import imageDetails from "../images/details.png";


function DashboardContentReports(){

    let [subjects, setSubjects] = useState([]);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("البلاغات"));
        dispatch(getInfoReports());
    }, [dispatch]);



    function showBtn(e, id){
        e.preventDefault();
        navigate(`/dashboard/reports/show`, {replace: true});
        localStorage.setItem("ShowReport", JSON.stringify(id));
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
                                        <th scope="col">Title</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">By</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            infos.reports.value[0]?.map((report, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{report.id}</th>
                                                        <th scope="row">{report.title}</th>
                                                        <th scope="row">{report.type}</th>
                                                        <td className='status'><span style={
                                                            {"color": `${
                                                                (report.status === "accepted") ? 'rgb(80, 115, 230)' : (report.status === "rejected") ? 'rgb(230, 80, 80)' : 'rgb(223, 162, 48)'
                                                            }`,
                                                            "background": `${
                                                                (report.status === "accepted") ? 'rgba(80, 115, 230, 0.350)' : (report.status === "rejected") ? 'rgba(230, 80, 80, 0.350)' : 'rgba(223, 162, 48, 0.350)'
                                                            }`
                                                            }}>{report.status}</span></td>
                                                        <th scope="row">{report.by}</th>
                                                        <td>
                                                            <button className='imageBtn' onClick={(e) => { showBtn(e, report.id) }}>
                                                                <img alt="" src={imageDetails}/>Show</button>
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



export default DashboardContentReports;






