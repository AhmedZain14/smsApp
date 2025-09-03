import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, sendExamSolution } from '../state/infoSlice';
import {  } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/homeContentClassExam.css';
import { createAdminMessage } from '../state/adminMessageSlice';
import { createReport } from '../state/makeSlice';


import timeLoading from '../images/timeLoading.gif';

// import './dashboard.css';

// Components

function HomeContentClassExam(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    const [ClassExamSele, setClassExamSele] = useState();
    // const [Questions, setQuestions] = useState([]);
    const [Answers, setAnswers] = useState([]);
    const [CheckStudent, setCheckStudent] = useState([]);

    let userLogin = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        dispatch(changeHeaderPath("إختبار الفصل"));
    }, [dispatch]);

    useEffect(() => {

        let checkStudentSol = infos?.examSolution?.filter((el, i) => {
            return el?.username === userLogin?.username
        })

        setCheckStudent(checkStudentSol)

    }, [infos.examSolution]);


    useEffect(() => {

        let classExSelec = infos?.exams?.filter((ex, i) => {
            return `${ex?.className}` === `${userLogin?.studentClass}`
        })

        setClassExamSele(classExSelec[0]);
        
    }, [infos.exams, userLogin.studentClass]);


    useEffect(() => {

        console.log(Answers)
        
    }, [Answers]);

    
    let ReportTypeRef = useRef();
    let ReportTitle = useRef();
    let ReportDesRef = useRef();

    function sendBtn(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
            
            dispatch(sendExamSolution({
                classExam: userLogin?.studentClass,
                name: userLogin?.name,
                username: userLogin?.username,
                date: DateNow,
                values: [...Answers]
            }));

            setTimeout(() => window.location.reload(), 2000);

            // window.location.reload();

    }
    
    // console.log(ClassExamSele)

    function HandleCheck(e, object){
        if (e.target.checked) {

            let checkTheSameChecked = Answers?.filter((an, i) => {
                return an?.answer === object?.answer
            })

            if(checkTheSameChecked.length > 0){
                let newObject = Answers?.map((e, index) => {
                    if(`${e?.answer}` === `${checkTheSameChecked[0]?.answer}`){
                        return {...e, check: true}
                    }else{
                        return e
                    }
                })
                setAnswers([...Answers, newObject])
            }else{
                object.check = true;
                setAnswers([...Answers, object])
            }

            // console.log(object);

          } else {

            let checkTheSameCheckedd = Answers?.filter((an, i) => {
                return an?.answer === object?.answer
            })

                let newObjectt = Answers?.map((e, index) => {
                    if(`${e?.answer}` === `${checkTheSameCheckedd[0]?.answer}`){
                        return {...e, check: false}
                    }else{
                        return e
                    }
                })
                // console.log(newObjectt)
                setAnswers([...newObjectt])
          }
    }

    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className={`DashBoard-Content_Overview_Exams ${(!(ClassExamSele)) ? "no-exam" : ""} ${((CheckStudent[0])) ? "no-exam" : ""}`}>
                    {
                        ((CheckStudent[0])) ? (
                            <>
                                <img alt="" src={timeLoading}/>
                                <h1>.لقد تم تقديم إجاباتك. الرجاء الإنتظار حتى يتم مراجعتها بدقة</h1>
                            </>
                        ) : (
                            (!(ClassExamSele)) ? (
                            <>
                                <img alt="" src={timeLoading}/>
                                <h1>... لايوجد إختبارات حتى الآن</h1>
                            </>
                            ) : (
                                <div className="DashBoard-Content_Overview_Exams_Exam">
                                    <form action="">
                                        <div className="DashBoard-Content_Overview_Exams_Exam_Group">
                                            {
                                                ClassExamSele?.questions?.map((ex, i) => {
                                                    return (
                                                        <div key={i} className="QuestionGroup">
                                                            <label className='ques' htmlFor="">{ex.question}</label>
                                                            {
                                                                ex?.answers?.map((ans, index) => {
                                                                    return (
                                                                        <div key={index} className='answer'>
                                                                            <input onChange={(e) => {HandleCheck(e, {questionName: ex.question, answer: ans})}} type="checkbox" name="" value="1/1"/>
                                                                            <label htmlFor="favorite_pet">{ans}</label>
                                                                        </div>  
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* <label htmlFor="ReportDes">Notes</label>
                                            <textarea ref={ReportDesRef} type="text" name='ReportDes'/> */}
                                        </div>
                                        <div className="DashBoard-Content_Overview_Exams_Exam_Control">
                                            <button onClick={(e) => {sendBtn(e)}}>تقديم الحل</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )

};



export default HomeContentClassExam;
