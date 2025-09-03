import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, getInfoActiveTeachers } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createTeacher.css';
import { createActiveTeacher, createClass, deleteActiveTeacher, deleteClass, EditActiveTeacher } from '../state/makeSlice';


import imageCreateAccount from "../images/addUser.png";
import imageBin from "../images/bin2.png";

// import './dashboard.css';

// Components

function DashboardContentTeachers(){

    let [TeacherClasses, setTeacherClasses] = useState([]);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("المعلمون"));
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

                if(checkTheSameAccount.length <= 0){
                    dispatch(makeAlert({message: ".هذا الحساب غير موجود. من فضلك أدخل أسم حساب صحيح", display: true}));
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
                        // TeacherUsernameRef.current.value = "";
                        // TeacherNameRef.current.value = "";
                        // SubjectNameRef.current.value = "";
                        // ClassStageRef.current.value = "";
                        // ClassNumberRef.current.value = "";
                        // window.location.reload();
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
    
    
            if(checkTheSameClass?.length <= 0){
                dispatch(makeAlert({message: "!الفصول التي أدخلتها غير موجودة. تأكدت من أنها موجودة بالفعل", display: true}));
            }else{
                let newClass = `${ClassStageRef.current.value}/${ClassNumberRef.current.value}`
                setTeacherClasses([...TeacherClasses, newClass])
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

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/teachers/create_teacher`, {replace: true});
    }

    // useEffect(() => {
    //     console.log(subjects);
    // }, [subjects]);
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Classes_ClassesTable">
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Classes</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            infos.teachers.ActiveTeachers?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.id}</th>
                                                        <th scope="row">{item.username}</th>
                                                        <th scope="row">{item.name}</th>
                                                        <th scope="row">{item.subject}</th>
                                                        <td className='subjects'>
                                                            {/* <span>english</span>
                                                            <span>arabic</span>
                                                            <span>english</span>
                                                            <span>arabic</span>
                                                            <span>english</span>
                                                            <span>arabic</span>
                                                            <span>english</span>
                                                            <span>arabic</span>
                                                            <span>english</span>
                                                            <span>arabic</span> */}
                                                            {
                                                                // console.log(classItem.class_subjects)
                                                                item.classes?.map((classItem, indexx) => {
                                                                    return (<span key={indexx}>{classItem}</span>)
                                                                    // console.log(subjectItem)
                                                                })
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className="deleteBtn" onClick={(e) => { deleteBtn(item.id) }}>
                                                            <img alt="" src={imageBin}/>Delete</button>
                                                        </td>
                                                    </tr>
                                                    )})
                                    ) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='control_panel'>
                        <button className='addBtn' onClick={(e) => { goTo(e) }}>
                        <img alt="" style={{"height": "26px", "width": "25px"}} src={imageCreateAccount}/>تسجيل معلم جديد</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentTeachers;






