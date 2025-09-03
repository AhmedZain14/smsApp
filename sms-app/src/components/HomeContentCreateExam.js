import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, getInfoExams } from '../state/infoSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createExam.css';
import { createExam } from '../state/makeSlice';



// import './dashboard.css';

// Components

function HomeContentCreateExam(){

    let [CurrentQuesions, setCurrentQuesions] = useState([]);
    let [CurrentAnswers, setCurrentAnswers] = useState([]);
    let [DoneQuestions, setDoneQuestions] = useState([]);

    let [AllClassesNameExam, setAllClassesNameExam] = useState([]);

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("إنشار أختبار"));
        dispatch(getInfoExams());
    }, [dispatch]);

    useEffect(() => {
        infos?.exams?.forEach( (cl, index) => {
            setAllClassesNameExam([...AllClassesNameExam, {id: cl.id, className: cl.className}])
        });
    }, [infos.exams]);

    
    let classNameRef = useRef();
    let subjectNameRef = useRef();
    let questionRef = useRef();
    let answerRef = useRef();
    let questionGroup = useRef();
    let answersGroup = useRef();
    
    let userLogin = JSON.parse(localStorage.getItem('user'));

    function createBtn(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});


        if( !(classNameRef.current.value === "") && !(subjectNameRef.current.value === "") ){

            let checkTheSameClass = infos.classes.value[0]?.filter( (cl, index) => {
                return `${cl.class_name.stage}/${cl.class_name.classNumber}` === `${classNameRef.current.value}`;
            });

            if(checkTheSameClass?.length <= 0 ){
                dispatch(makeAlert({message: "تأكد من أن الفصل الذي أدخلته صحيح", display: true}));
            }else{
                if(DoneQuestions?.length <= 0){
                    dispatch(makeAlert({message: "!لا تستطيع إنشاء إختبار بدون وضع أسئلة وأجوبة", display: true}));
                }else{
    
                    let checkTheSameClass = AllClassesNameExam?.filter((el, i) => {
                        return el.className === classNameRef.current.value
                    })
    
                    // console.log(AllClassesNameExam)
    
                    if(checkTheSameClass?.length > 0){
                        dispatch(makeAlert({message: "!هناك إختبار لم ينتهي بعد في هذا الفصل", display: true}));
                    }else{
                        dispatch(createExam({
                            className: classNameRef.current.value,
                            date: DateNow,
                            subjectName: subjectNameRef.current.value,
                            by: userLogin?.name,
                            questions: [
                                ...DoneQuestions
                            ]
                        }))

                        classNameRef.current.value = "";
                        subjectNameRef.current.value = "";
                        setCurrentQuesions([]);
                        setCurrentAnswers([]);
                        setDoneQuestions([]);

                        // window.location.reload();
                    }
                }
            }


        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function addQuestion(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        let checkTheSameQuestion = CurrentQuesions?.filter( (cl, index) => {
            return questionRef.current.value.toLowerCase() === cl.toLowerCase();
        });

        if(!(questionRef.current.value === "")){
            if(checkTheSameQuestion.length > 0){
                dispatch(makeAlert({message: "!أنت بالفعل أضفت هذا السؤال", display: true}));
            }else{
                if(CurrentQuesions?.length <= 0){
                    setCurrentQuesions([
                        ...CurrentQuesions, 
                        questionRef.current.value.toLowerCase()
                    ]);
                }else{
                    dispatch(makeAlert({message: "!لقد أضفت السؤال، قم بإضافة أجوبة لهذا السؤال", display: true}));
                }
            }
        }else{
            dispatch(makeAlert({message: "!لا يمكن إضافة هذا السؤال، لأن حقل السؤال فارغ", display: true}));
        }

    }

    function addAnswer(e){
        e.preventDefault();

        // console.log(CurrentQuesions?.length === 0)

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        let checkTheSameAnswer = CurrentAnswers?.filter( (a, index) => {
            return answerRef.current.value.toLowerCase() === a.toLowerCase();
        });

        if(!(answerRef.current.value === "")){
            if(checkTheSameAnswer.length > 0){
                dispatch(makeAlert({message: "!لقد أضفت الإجابة بالفعل", display: true}));
            }else{
                setCurrentAnswers([
                    ...CurrentAnswers,
                    answerRef.current.value.toLowerCase()
                ]);
            }
        }else if(CurrentQuesions?.length === 0){
            dispatch(makeAlert({message: "!لا يمكن إضافة الإجابة، لأن حقل الإجابة فارغ أو لم يتم إضافة السؤال", display: true}));
        }else if(CurrentQuesions?.length === undefined){
            dispatch(makeAlert({message: "!لا يمكن إضافة الإجابة، لأن حقل الإجابة فارغ أو لم يتم إضافة السؤال", display: true}));
        }else{
            dispatch(makeAlert({message: "!لا يمكن إضافة الإجابة، لأن حقل الإجابة فارغ أو لم يتم إضافة السؤال", display: true}));
        }

    }

    function doneBtn(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        
        if(!(CurrentAnswers?.length === 0 || CurrentQuesions?.length === 0)){
            
            console.log(DoneQuestions)
            console.log(CurrentQuesions)

            let checkTheSameDones = DoneQuestions?.filter( (d, index) => {
                return d?.question[0]?.toLowerCase() === CurrentQuesions[0]?.toLowerCase();
            });

            if(checkTheSameDones?.length > 0){
                dispatch(makeAlert({message: "!هذا السؤال جاهز بالفعلس", display: true}));
            }else{
                setDoneQuestions([
                    ...DoneQuestions,
                    {
                        question: CurrentQuesions[0],
                        answers: [...CurrentAnswers]
                    }
                ]);
    
                questionRef.current.value = '';
                answerRef.current.value = '';
                setCurrentQuesions([]);
                setCurrentAnswers([]);  
                console.log(DoneQuestions)
            }

        }else{
            dispatch(makeAlert({message: "!من فضلك أدخل السؤال أولاً ثم أجوبته", display: true}));
        }

    }

    function deleteBtn(v){
        // dispatch(deleteClass(v));
        window.location.reload();
    }

    // useEffect(() => {
    //     console.log(subjects);
    // }, [subjects]);
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="Home-Content_Overview_Classes_CreateClasses">
                        <form action="">
                            <div className="Home-Content_Overview_Classes_CreateClasses_Group">
                                <label htmlFor="className">أسم الفصل الدراسي</label>
                                <input ref={classNameRef} type="text" name='className'/>
                                <label htmlFor="subjectName">أسم المادة الدراسية</label>
                                <input ref={subjectNameRef} type="text" name='subjectName'/>
                                <label htmlFor="question">السؤال ( اضغط زر أضف السؤال لإضافته )</label>
                                <input ref={questionRef} type="text" name='question'/>
                                <label htmlFor="answer">إجابات السؤال ( اضغط زر إضافة الإجابة )</label>
                                <input ref={answerRef} type="text" name='answer'/>
                                <div ref={questionGroup} className="spanGroup questions-group">
                                {CurrentQuesions.length > 0 ? (
                                            CurrentQuesions?.map((qes, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span>Question[{index + 1}]: {qes}</span>
                                                    </div>
                                             )})
                                     ) : "..."} 
                                </div>
                                <div ref={answersGroup} className="spanGroup questions-group">
                                {CurrentAnswers.length > 0 ? (
                                            CurrentAnswers?.map((ans, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span>Answer[{index + 1}]: {ans}</span>
                                                    </div>
                                             )})
                                     ) : "..."} 
                                </div>
                                <div className="spanGroup questions-group">
                                {DoneQuestions.length > 0 ? (
                                            DoneQuestions?.map((d, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span>[{d.question}]: Done ✔</span>
                                                    </div>
                                             )})
                                     ) : "..."} 
                                </div>
                            </div>
                            <div className="Home-Content_Overview_Classes_CreateClasses_Control">
                                <button onClick={(e) => {addQuestion(e)}}>إضافة سؤال</button>
                                <button onClick={(e) => {addAnswer(e)}}>إضافة إجابة</button>
                                <button onClick={(e) => {doneBtn(e)}}>إنهاء السؤال</button>
                                <button onClick={(e) => {createBtn(e)}}>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default HomeContentCreateExam;






