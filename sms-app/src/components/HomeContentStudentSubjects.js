import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link} from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/homeContentStudentClass.css';

// Components

import roomImage from '../images/roomImage.png';


function HomeContentStudentSubjects(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );
    const [SubjectC, setSubjectC] = useState([]);
    const [SelectedClass, setSelectedClass] = useState([]);

    const [TeacherSubSelected, setTeacherSubSelected] = useState();


    let userLogin = JSON.parse(localStorage.getItem('user'));
    let teacherClassSelected = JSON.parse(localStorage.getItem("teacherClassSelected"));

    useEffect(() => {
        
        // window.location.reload();
        
    }, [teacherClassSelected]);
    

    useEffect(() => {

        infos?.classes.value[0]?.map((cl, index) => {
            if((`${cl.class_name.stage}/${cl.class_name.classNumber}`) === userLogin?.studentClass || (`${cl.class_name.stage}/${cl.class_name.classNumber}`) === teacherClassSelected){
                
                console.log(cl)
                setSelectedClass(cl)
                // cl.class_subjects?.map((sub, i) => {
                    //     // console.log(sub.name)
                    //     setSubjectC([sub.name])
                    // })
                }
            })
            
        }, [infos.classes.value, teacherClassSelected]);
        
    function subBtn(e, subName){
        // e.preventDefault();
        localStorage.setItem("subjectName", JSON.stringify(subName));
    }

    useEffect(() => {

            let arr = []
            
            SelectedClass.class_subjects?.map((sub, i) => {
                return arr.push(sub.name)
            })
            setSubjectC([...arr])

            console.log(arr)
            
    }, [SelectedClass?.class_subjects]);

    useEffect(() => {

        let teacherSelected = infos?.teachers?.ActiveTeachers?.find( (te) => {
            return te.username === userLogin?.username
        })

        setTeacherSubSelected(teacherSelected);

    }, [infos.teachers.ActiveTeachers, userLogin.username]);

    return (
        <> 
            <div className="Home-Content_Overview_Subjects">
                {
                    infos?.loading ? "" : (
                        (!(userLogin?.role === "student")) ? "" : (
                            SubjectC?.map((sub, i) => {
                                return (
                                <Link onClick={(e) => {subBtn(e, sub)}} key={i} to={'/home/student_class/room'}>
                                    <div className="Home-Content_Overview_Subjects_Subject">
                                        <div className='header'>
                                            <img alt="" src={roomImage}/>
                                        </div>
                                        <div className='description'>
                                            اضغط للإنضمام إلى الغرفة التعليمية
                                        </div>
                                        <div className='info'>
                                            <span className='number'>
                                            {1101 + i}
                                            </span>
                                            <span className='name'>
                                            {sub} :مادة الغرفة
                                            </span>
                                        </div>
                                    </div>
                                </Link>  
                                )
                            })
                        )                        
                    )
                }
                {
                    // console.log(`${SubjectC}`)
                    (!(userLogin?.role === "teacher")) ? "" : (

                        SubjectC?.map((sub, i) => {
                            return (
                                (SubjectC[i] === `${TeacherSubSelected?.subject}` ) ? (
                                <Link onClick={(e) => {subBtn(e, TeacherSubSelected?.subject)}} to={'/home/student_class/room'}>
                                    {/* <div className="Home-Content_Overview_Subjects_Subject"> */}
                                        {/* {TeacherSubSelected?.subject} */}
                                        <div className="Home-Content_Overview_Subjects_Subject">
                                            <div className='header'>
                                                <img alt="" src={roomImage}/>
                                            </div>
                                            <div className='description'>
                                                اضغط للإنضمام إلى الغرفة التعليمية
                                            </div>
                                            <div className='info'>
                                                <span className='number'>
                                                -
                                                </span>
                                                <span className='name'>
                                                {TeacherSubSelected?.subject} :مادة الغرفة
                                                </span>
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </Link>  
                                ) : ""
                            )
                        })

                        )
                }
            </div>
       </>
    )

};



export default HomeContentStudentSubjects;



