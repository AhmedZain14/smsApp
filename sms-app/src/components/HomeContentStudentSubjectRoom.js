import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link} from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, getInfoClasses } from '../state/infoSlice';
import '../pages/homeContentStudentClass.css';
import { RoomSendMessage } from '../state/infoSlice';

// Components




function HomeContentStudentClassRoom(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );
    const [Subject, setSubject] = useState();
    const [RoomObject, setRoomObject] = useState();
    const [StudentsSelected, setStudentsSelected] = useState();
    const [TeachersSelected, setTeachersSelected] = useState();
    const [teacherRoomCount, setteacherRoomCount] = useState();

    let userLogin = JSON.parse(localStorage.getItem('user'));
    let SubjectName = localStorage.getItem("subjectName");
    let teacherClassSelected = JSON.parse(localStorage.getItem("teacherClassSelected"));

    let userMessageRef = useRef();



    useEffect(() => {

        // console.log(teacherClassSelected)
        
        infos?.classes.value[0]?.forEach((cl, index) => {
            if((`${cl.class_name.stage}/${cl.class_name.classNumber}`) === userLogin?.studentClass || (`${cl.class_name.stage}/${cl.class_name.classNumber}`) === teacherClassSelected){
                
                console.log(cl)
                setRoomObject(cl);
                cl.class_subjects.map((sub, i) => {
                    if(JSON.stringify(sub.name) === SubjectName){
                        
                        console.log("yessssss")
                        setSubject(sub)
                    }
                })
            }else{
                // console.log("nooo class")
            }
        })
        
    }, [infos.classes.value]);

    
    useEffect(() => {

        let studentsSelected = infos?.accounts?.value[0]?.filter( (i) => {
            return i?.studentClass === `${RoomObject?.class_name.stage}/${RoomObject?.class_name.classNumber}`
        })
        
        setStudentsSelected(studentsSelected);

        let teacherSelected = infos?.teachers?.ActiveTeachers?.filter( (te) => {
            return (te.classes.includes(`${RoomObject?.class_name.stage}/${RoomObject?.class_name.classNumber}`))
        })

        setTeachersSelected(teacherSelected);

    }, [infos.teachers.ActiveTeachers, RoomObject, SubjectName]);


    useEffect(() => {

        let teacherRoomCount = TeachersSelected?.filter((ele, i) => {
            return (`${ele.subject}` === `${Subject.name}`);
        })

        setteacherRoomCount(teacherRoomCount);

    }, [TeachersSelected]);


    function handleSendingMessage(e){
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

        if(!(userMessageRef.current.value === "")){

            let OldRoomObjectSub = RoomObject.class_subjects.map((sub, i) => {
                if(JSON.stringify(sub.name) === SubjectName){
                    return {
                        name: sub.name,
                        roomChat: [
                            ...sub.roomChat,
                            {
                                by: userLogin?.name,
                                date: DateNow,
                                message: userMessageRef.current.value
                            }
                        ]
                    }
                }else{
                    return sub
                }
            })

            let NewRoomObject = {
                id: RoomObject.id,
                class_name: {
                    stage: RoomObject.class_name.stage,
                    classNumber: RoomObject.class_name.classNumber
                },
                class_subjects: [...OldRoomObjectSub]
            }

            console.log(NewRoomObject)
            
            // NewRoomObject?.class_subjects.map((sub, i) => {
            //     if(JSON.stringify(sub.name) === SubjectName){
            //         setSubject(sub)
            //     }
            // })

            dispatch(RoomSendMessage(
                {
                    ...NewRoomObject
                }
            ))

            userMessageRef.current.value = ""

        }
    }

    
    function btnSend(e){
        e.preventDefault();

        // console.log("seend")
        handleSendingMessage(e)
        dispatch(getInfoClasses());

    }


    // const handleKeyDown = (event) => {
    //     // console.log(event)
    //     if (event.key === 'Enter') {
    //         handleSendingMessage(event)
    //     }
    //   };

    return (
        <> 
            <div className="Home-Content_Overview_Room">
            <div className="Home-Content_Overview_Room_Members">
                    <div className='header'>
                        <span>{(teacherRoomCount?.length === undefined || StudentsSelected?.length === undefined) ? 0 :  (teacherRoomCount?.length + StudentsSelected?.length )}</span>
                        <span>أعضاء الغرفة</span>
                    </div>
                    <ul className="memberList">
                        {
                            TeachersSelected?.map((e, i) => {
                                    return (`${e.subject}` === `${Subject.name}`) ? (
                                        <li key={i}>
                                            <span>
                                            <i className="fa-solid fa-graduation-cap"></i>
                                            {e.name}
                                            </span>
                                            <span>
                                            <i className="fa-solid fa-circle online"></i>
                                                Active
                                            </span>
                                        </li>
                                    ) : ""
                            })
                        }
                        {
                            StudentsSelected?.map((e, i) => {
                                return (
                                    <li key={i}>
                                        <span>
                                        <i className="fa-solid fa-user-large"></i>
                                        {e.name}
                                        </span>
                                        <span>
                                        <i className="fa-solid fa-circle online"></i>
                                            Active
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="Home-Content_Overview_Room_Chat">
                    <div className="messages">
                        {
                            (Subject === undefined) ? "" : (
                            
                                Subject.roomChat?.map((e, index) => {
                                return (
                                    <div key={index} className='message-box'>
                                        <div className='message-header'>
                                            <i className="fa-solid fa-circle-user"></i>
                                            <div className="texts">
                                                <span className="name" title="">{e.by}</span>
                                                <span className="date" title="">{e.date}</span>
                                            </div>
                                        </div>
                                        <div className='message-content'>
                                            <p>
                                                {e.message}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                            )
                        }

                    </div>
                    <div className="control">
                        <textarea onKeyDown={(e) => {}} ref={userMessageRef} type="text" name='userMessage' placeholder='Type your message...'/>
                        <button onClick={(e) => { btnSend(e)}}>Send</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default HomeContentStudentClassRoom;



