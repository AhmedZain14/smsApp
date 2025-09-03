import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createClasses.css';
import { createClass, deleteClass } from '../state/makeSlice';



import imageAdd from "../images/plus.png";


// Components

function DashboardContentClassesCreate(){

    let [subjects, setSubjects] = useState([]);

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الفصول / إنشاء فصل جديد"));
    }, [dispatch]);

    
    let StageRef = useRef();
    let ClassNumberRef = useRef();
    let ClassSubjectRef = useRef();
    let ClassSubjectGroupRef = useRef();
    
    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});


        console.log(infos.classes.value[0]);
        // console.log(infos.classes.value[0][0].class_name.classNumber);

        if(!(StageRef.current.value == "" || ClassNumberRef.current.value == "" || subjects.length == 0)){

                let checkTheSameClass = infos?.classes?.value[0]?.filter( (cl, index) => {
                    return (cl.class_name.stage === parseInt(StageRef.current.value) && cl.class_name.classNumber === parseInt(ClassNumberRef.current.value));
                });


                // if(checkTheSameClass?.length > 0){
                //     console.log(checkTheSameClass);
                // }else{
                //     console.log(checkTheSameClass);
                // }

                if(checkTheSameClass?.length > 0){
                    dispatch(makeAlert({message: "لقد تم إنشاء هذا الفصل بالفعل. لا تستطيع إنشاء فصل آخر بهذا الأسم", display: true}));
                }else{
                        dispatch(createClass(
                            {
                                class_name: {
                                  stage: parseInt(StageRef.current.value),
                                  classNumber: parseInt(ClassNumberRef.current.value)
                                },
                                class_subjects: [
                                    ...subjects
                                ]
                              }
                        ));
                        StageRef.current.value = "";
                        ClassNumberRef.current.value = "";
                        ClassSubjectRef.current.value = "";
                        setSubjects([]);
                        ClassSubjectGroupRef.current.value = "...";
                        // window.location.reload();
                }



        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function addSubject(e){
        e.preventDefault();

        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        let checkTheSameSubject = subjects?.filter( (cl, index) => {
            return ClassSubjectRef.current.value.toLowerCase() === cl.name;
        });

        if(!(ClassSubjectRef.current.value === "")){
            if(checkTheSameSubject.length > 0){
                dispatch(makeAlert({message: "!لقد أضفت هذه المادة بالفعل", display: true}));
            }else{
                setSubjects([...subjects, {
                    name: ClassSubjectRef.current.value.toLowerCase(),
                    roomChat: [
                        {
                            by: "management",
                            date: DateNow,
                            message: "chat done"
                        }
                    ]
                }]);
            }
        }else{
            dispatch(makeAlert({message: "!لا يمكن إضافة المادة، لأن حقل المادة فارغ", display: true}));
        }

    }

    function deleteBtn(v){
        dispatch(deleteClass(v));
        window.location.reload();
    }

    // useEffect(() => {
    //     console.log(subjects);
    // }, [subjects]);
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Classes_CreateClasses">
                        <form action="">
                            {/* <h1>إنشاء فصل جديد</h1> */}
                            <div className="DashBoard-Content_Overview_Classes_CreateClasses_Group">
                                <label htmlFor="Name">المرحلة (1/.., 2/..)</label>
                                <input ref={StageRef} type="text" name='Stage'/>
                                <label htmlFor="ClassNumber">رقم الفصل (../1, ../2)</label>
                                <input ref={ClassNumberRef} type="text" name='ClassNumber'/>
                                <label htmlFor="ClassSubject">إضافة مادة ( أضغط على زر إضافة المادة لتصبح ضمن المواد )</label>
                                <input ref={ClassSubjectRef} type="text" name='ClassSubject'/>
                                <div className="spanGroup" ref={ClassSubjectGroupRef}>
                                {subjects.length > 0 ? (
                                            subjects?.map((subjectItem, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span>{subjectItem.name}</span>
                                                    </div>
                                                    )})
                                    ) : "..."}
                                </div>
                            </div>
                            <div className="DashBoard-Content_Overview_Classes_CreateClasses_Control">
                                <button className='addBtn' onClick={(e) => { addSubject(e) }}>
                                    <img alt="" style={{"height": "25px", "width": "25px"}} src={imageAdd}/>إضافة مادة</button>
                                <button className='addBtn' onClick={(e) => { createBtn(e) }}>
                                    <img alt="" style={{"height": "25px", "width": "25px"}} src={imageAdd}/>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentClassesCreate;






