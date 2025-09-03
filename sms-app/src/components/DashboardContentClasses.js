import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createClasses.css';
import { createClass, deleteClass } from '../state/makeSlice';



import imageBin from "../images/bin2.png";
import imageAddPost from "../images/add.png";

// Components

function DashboardContentClasses(){

    let [subjects, setSubjects] = useState([]);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الفصول"));
    }, [dispatch]);

    
    let StageRef = useRef();
    let ClassNumberRef = useRef();
    let ClassSubjectRef = useRef();


    let searchByClassNameRef = useRef();
    const [searchByClassName, setSearchByClassName] = useState('');
    const [filterdSearchByClassName, setFilterdSearchByClassName] = useState();

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
                        ClassSubjectRef.current.value = "...";
                        window.location.reload();
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

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/classes/create`, {replace: true});
    }

    const searchByClassNameHandleChange = (event) => {
        setSearchByClassName(event.target.value);
        // console.log('value is:', event.target.value);
      };


      useEffect(() => {
        
        // let classNameFilter = infos.classes.value[0]?.filter((item, index) => {
        //     return `${item.class_name.stage}/${item.class_name.classNumber}` == `${searchByClassName}`
        // });

        const regex = new RegExp(`^${searchByClassName}`);

        const classNameFilter = infos.classes.value[0]?.filter(x => regex.test(`${x.class_name.stage}/${x.class_name.classNumber}`));


        // console.log("classNameFilter:  ", classNameFilter);

        setFilterdSearchByClassName(classNameFilter);

    }, [infos.accounts.value, searchByClassName]);

    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Classes_ClassesTable">
                            <div className="searchBox">
                                <input ref={searchByClassNameRef} onChange={searchByClassNameHandleChange} type="text" name='search' placeholder='search by class name'/>
                            </div>
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Class Name</th>
                                        <th scope="col">Subjects</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                (!(filterdSearchByClassName?.length === 0)) ? (
                                    <>
                                    {(
                                        filterdSearchByClassName?.map((classItem, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{classItem.id}</th>
                                                    <th scope="row">{classItem.class_name.stage}/{classItem.class_name.classNumber}</th>
                                                    <td className='subjects'>
                                                        {
                                                            classItem.class_subjects?.map((subjectItem, indexx) => {
                                                                return (<span key={indexx}>{subjectItem.name}</span>)

                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        <button className='deleteBtn' onClick={(e) => { deleteBtn(classItem.id) }}>
                                                            <img alt="" src={imageBin}/>Delete</button>
                                                    </td>
                                                </tr>
                                                )})
                                    )}
                                    </>
                                ) : (
                                        <>
                                        {!infos.loading ? (
                                            infos.classes.value[0]?.map((classItem, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{classItem.id}</th>
                                                        <th scope="row">{classItem.class_name.stage}/{classItem.class_name.classNumber}</th>
                                                        <td className='subjects'>
                                                            {
                                                                classItem.class_subjects?.map((subjectItem, indexx) => {
                                                                    return (<span key={indexx}>{subjectItem.name}</span>)

                                                                })
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className='deleteBtn' onClick={(e) => { deleteBtn(classItem.id) }}>
                                                                <img alt="" src={imageBin}/>Delete</button>
                                                        </td>
                                                    </tr>
                                                    )})
                                    ) : ""}
                                        </>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='control_panel'>
                        <button className='addBtn' onClick={(e) => { goTo(e) }}>
                            <img alt="" style={{"height": "25px", "width": "25px"}} src={imageAddPost}/>إنشاء فصل جديد</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentClasses;






