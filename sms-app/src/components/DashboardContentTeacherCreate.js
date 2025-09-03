import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, getInfoActiveTeachers } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createTeacher.css';
import { createActiveTeacher, createClass, deleteActiveTeacher, deleteClass, EditActiveTeacher } from '../state/makeSlice';

import imageCreateAccount from "../images/plus.png";
import imageEdit from "../images/edit.png";

// import './dashboard.css';

// Components

function DashboardContentTeachersCreate(){

    let [TeacherClasses, setTeacherClasses] = useState([]);

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("المعلمون / تسجيل معلم جديد"));
        getInfoActiveTeachers();
    }, [dispatch]);

    
    let TeacherUsernameRef = useRef();
    let TeacherNameRef = useRef();
    let SubjectNameRef = useRef();
    let ClassStageRef = useRef();
    let ClassNumberRef = useRef();

    function createBtn(e){
        e.preventDefault();

        // console.log(infos.classes.value[0][0].class_name.stage);
        // console.log(infos.classes.value[0][0].class_name.classNumber);

        if(!(TeacherUsernameRef.current.value == "" || TeacherNameRef.current.value == "" || SubjectNameRef.current.value == "" || TeacherClasses.length <= 0)){


                let checkTheSameActiveTeacher = infos.teachers.ActiveTeachers.filter((item, index) => {
                    return item.username === TeacherUsernameRef.current.value
                });

                let checkTheSameAccount = infos.accounts.value[0]?.filter( (acc, index) => {
                    return acc.username === TeacherUsernameRef.current.value;
                });

                let checkTeacherRole = infos.accounts.value[0]?.filter( (acc, index) => {
                    return acc.username === TeacherUsernameRef.current.value;
                });

                if(checkTheSameAccount.length <= 0){
                    dispatch(makeAlert({message: ".هذا الحساب غير موجود. من فضلك أدخل أسم حساب صحيح", display: true}));
                }else{

                    if(checkTeacherRole[0].role !== "teacher"){
                        dispatch(makeAlert({message: "هذا الحساب ليس معلماً", display: true}));
                    }else{
                        if(checkTheSameActiveTeacher.length > 0){
                            dispatch(makeAlert({message: "هذا الحساب تمت إضافته من قبل وهو معلم بالفعل. أضغط على زر التعديل إذا كنت ترغب في التعديل عليه", display: true}));
                        }else{
                            dispatch(createActiveTeacher(
                                {
                                    username: TeacherUsernameRef.current.value,
                                    name: TeacherNameRef.current.value,
                                    classes: [...TeacherClasses],
                                    subject: SubjectNameRef.current.value
                                }
                            ));
                            TeacherUsernameRef.current.value = "";
                            TeacherNameRef.current.value = "";
                            SubjectNameRef.current.value = "";
                            ClassStageRef.current.value = "";
                            ClassNumberRef.current.value = "";
                            setTeacherClasses([]);
                            // window.location.reload();
                        }
                    }

                }



        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function addSubject(e){
        e.preventDefault();

        if(!(ClassStageRef.current.value == "" || ClassNumberRef.current.value == "")){
            let checkTheSameClass = infos.classes.value[0]?.filter( (cl, index) => {
                return (cl.class_name.stage === parseInt(ClassStageRef.current.value) && cl.class_name.classNumber === parseInt(ClassNumberRef.current.value));
            });


            let checkTheSameClassTeacher = TeacherClasses?.filter( (cl, index) => {
                    return  cl === `${ClassStageRef.current.value}/${ClassNumberRef.current.value}`;
            });
    
    
            if(checkTheSameClass?.length <= 0){
                dispatch(makeAlert({message: "!الفصل الذي أدخلته غير موجود. تأكد من أنه موجود بالفعل", display: true}));
            }else{


                if(checkTheSameClassTeacher?.length <= 0){
                    let newClass = `${ClassStageRef.current.value}/${ClassNumberRef.current.value}`
                    setTeacherClasses([...TeacherClasses, newClass])
                }else{
                    dispatch(makeAlert({message: "!لا تستطيع إضافة الفصل مرتين", display: true}));
                }

            }


        }else{
            dispatch(makeAlert({message: "أدخل المرحلة الدراسية ورقم الفصل", display: true}));
        }

    }

    function EditBtn(e){
        e.preventDefault();

        if(!(TeacherUsernameRef.current.value == "" || TeacherNameRef.current.value == "" || SubjectNameRef.current.value == "" || TeacherClasses.length <= 0)){


                let checkTheSameActiveTeacher = infos.teachers.ActiveTeachers.filter((item, index) => {
                    return item.username === TeacherUsernameRef.current.value
                });

                if(checkTheSameActiveTeacher.length > 0){
                    dispatch(EditActiveTeacher({
                        id: checkTheSameActiveTeacher[0].id,
                        value: {
                            id: checkTheSameActiveTeacher[0].id,
                            username: checkTheSameActiveTeacher[0].username,
                            name: TeacherNameRef.current.value,
                            classes: [...TeacherClasses],
                            subject: SubjectNameRef.current.value
                        }
                    }));
                    TeacherUsernameRef.current.value = "";
                    TeacherNameRef.current.value = "";
                    SubjectNameRef.current.value = "";
                    ClassStageRef.current.value = "";
                    ClassNumberRef.current.value = "";
                    window.location.reload();
                }else{
                    dispatch(makeAlert({message: "هذا الحساب غير مُسجل كمعلم. من فضلك تأكد أولاً", display: true}));
                }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function deleteBtn(v){
        dispatch(deleteActiveTeacher(v));
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
                            {/* <h1>إنشاء معلم جديد</h1> */}
                            <div className="DashBoard-Content_Overview_Classes_CreateClasses_Group">
                                <label htmlFor="TeacherUsername">أسم حساب المعلم</label>
                                <input ref={TeacherUsernameRef} type="text" name='TeacherUsername'/>
                                <label htmlFor="TeacherName">أسم المعلم</label>
                                <input ref={TeacherNameRef} type="text" name='TeacherName'/>
                                <label htmlFor="SubjectName">أسم المادة التي يتم تدريسها</label>
                                <input ref={SubjectNameRef} type="text" name='SubjectName'/>
                                <label htmlFor="ClassStage">المرحلة الدراسية (1/.., 2/..)</label>
                                <input ref={ClassStageRef} type="text" name='ClassStage'/>
                                <label htmlFor="ClassNumber">رقم الفصل (../1, ../2)</label>
                                <input ref={ClassNumberRef} type="text" name='ClassNumber'/>
                                {/* <label htmlFor="ClassesGroup">Classes (Click on add class button to add it.)</label> */}
                                {/* <input ref={ClassesGroupRef} type="text" name='ClassesGroup'/> */}
                                <div className="spanGroup">
                                {TeacherClasses.length > 0 ? (
                                            TeacherClasses?.map((classItem, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span>{classItem}</span>
                                                    </div>
                                                    )})
                                    ) : "..."}
                                </div>
                            </div>
                            <div className="DashBoard-Content_Overview_Classes_CreateClasses_Control">
                                <button className='addBtn' onClick={(e) => {addSubject(e)}}>
                                <img alt="" style={{"height": "20px", "width": "20px"}} src={imageCreateAccount}/>إضافة فصل</button>
                                <button className='addBtn' onClick={(e) => {createBtn(e)}}>
                                <img alt="" style={{"height": "20px", "width": "20px"}} src={imageCreateAccount}/>إنشاء</button>
                                <button className='imageBtn' onClick={(e) => {EditBtn(e)}}>
                                <img alt="" style={{"height": "20px", "width": "20px"}} src={imageEdit}/>تعديل</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentTeachersCreate;






