import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, reportEdit } from '../state/infoSlice';
import '../pages/dashboardShowReport.css';
import { fetchPosts } from '../state/postsSlice';
import { accountSetting } from '../state/settingSlice';
import { deleteReport } from '../state/makeSlice';

// Components




function DashboardContentShowReport(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );

    let [ReportInfo, setReportInfo] = useState();

    useEffect(() => {
        dispatch(changeHeaderPath("البلاغات / عرض البلاغ"));
        dispatch(getInfoReports());
    }, [dispatch]);

    useEffect(() => {
        
        let reportId = JSON.parse(localStorage.getItem("ShowReport"));
        
        let reportSelected = infos.reports.value[0]?.find( (report, index) => {
            return report.id === reportId
        });

        setReportInfo(reportSelected);
        
    }, [infos.reports.value]);


    function acceptBtn(e){
        e.preventDefault();

        dispatch(reportEdit({
                id: ReportInfo?.id,
                title: ReportInfo?.title,
                by: ReportInfo?.by,
                des: ReportInfo?.des,
                type: ReportInfo?.type,
                status: "accepted",
                createDate: ReportInfo?.createDate
        }));
        window.location.reload();
    }

    function rejectBtn(e){
        e.preventDefault();

        dispatch(reportEdit({
                id: ReportInfo?.id,
                title: ReportInfo?.title,
                des: ReportInfo?.des,
                by: ReportInfo?.by,
                type: ReportInfo?.type,
                status: "rejected",
                createDate: ReportInfo?.createDate
        }));
        window.location.reload();
    }

    function pendBtn(e){
        e.preventDefault();

        dispatch(reportEdit({
                id: ReportInfo?.id,
                title: ReportInfo?.title,
                des: ReportInfo?.des,
                by: ReportInfo?.by,
                type: ReportInfo?.type,
                status: "pending",
                createDate: ReportInfo?.createDate
        }));
        window.location.reload();
    }


    function deleteBtn(e, id){
        dispatch(deleteReport(id))
        window.location.reload();
        // navigate("/dashboard/accounts", {replace: true});
    }

    return (
        <> 
            <div className="DashBoard-Content_Overview ShowReports">
                <div className="DashBoard-Content_Overview_Reports_Info">
                    <span className='id'>Id: <span>{ReportInfo?.id}</span></span>
                    <span className='date'>Date Created: <span>{ReportInfo?.createDate}</span></span>
                    <span className='date'>By: <span>{ReportInfo?.by}</span></span>
                    <span className='title'>Title: <span>{ReportInfo?.title}</span></span>
                    <span className='Type'>Type: <span>{ReportInfo?.type}</span></span>
                    <span className={`status`}>Status: <span className={`${(ReportInfo?.status === "rejected") ? 'report-rejected' : (ReportInfo?.status === "accepted") ? 'report-accepted' : 'report-pending'}`}>{ReportInfo?.status}</span></span>
                    <span className='des'>Description: <span>{ReportInfo?.des}</span></span>
                </div>
                <div className="DashBoard-Content_Overview_Reports">
                    <div className="DashBoard-Content_Overview_Reports_ReportForm">
                        <form action="">
                            <div className="DashBoard-Content_Overview_Reports_ReportForm_Control">
                                <button onClick={(e) => {acceptBtn(e)}}>قبول البلاغ</button>
                                <button onClick={(e) => {rejectBtn(e)}}>رفض البلاغ</button>
                                <button onClick={(e) => {pendBtn(e)}}>تعليق البلاغ</button>
                                <button onClick={(e) => {deleteBtn(e, ReportInfo?.id)}}>حذف البلاغ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentShowReport;



