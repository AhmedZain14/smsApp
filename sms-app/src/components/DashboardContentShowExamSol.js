import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/dashboardShowExamSol.css';
import { fetchPosts } from '../state/postsSlice';
import { accountSetting } from '../state/settingSlice';

// Components




function DashboardContentShowExamSol(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );

    let [AccountInfo, setAccountInfo] = useState();
    let [AccountTeacher, setAccountTeacher] = useState();
    let [AccountActive, setAccountActive] = useState();

    let Solution = JSON.parse(localStorage.getItem("ShowExamSol"));

    useEffect(() => {
        dispatch(changeHeaderPath("حلول الأختبارات / حل الأختبار"));
    }, [dispatch]);

    useEffect(() => {
        
        let accountId = JSON.parse(localStorage.getItem("ShowAccount"));
    
        let accountSelected = infos.accounts.value[0]?.find( (acc, index) => {
            return acc.id === accountId
        });

        let accountTeacher = infos.teachers.ActiveTeachers?.find( (acc, index) => {
            return acc.username === accountSelected?.username
        });

        // console.log(accountTeacher)

        setAccountTeacher(accountTeacher);

        setAccountInfo(accountSelected);
        // setAccountActive(accountSelected?.active)
        
    }, [infos.accounts.value[0], infos.teachers.ActiveTeachers]);




    return (
        <> 
            <div className="DashBoard-Content_Overview ShowAccounts">
                <div className="DashBoard-Content_Overview_Show_Exam_Sol">
                    <div className="info">
                        <span className='id'>Id: <span>{Solution?.id}</span></span>
                        <span className='id'>Class Name: <span>{Solution?.classExam}</span></span>
                        <span className='username'>Username: <span>{Solution?.username}</span></span>
                        <span className='name'>Name: <span>{Solution?.name}</span></span>
                        <span className='date'>Date: <span>{Solution?.date}</span></span>
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        {
                            Solution?.values.map((sol, i) => {
                                if(sol.check === true){
                                    return (
                                        <span>{sol.questionName} <span>[{sol.answer}]</span></span>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentShowExamSol;



