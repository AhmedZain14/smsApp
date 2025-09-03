import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, accountEdit, getPrivateNotes } from '../state/infoSlice';
import { Link } from "react-router-dom";

import studentBadge from '../images/studentBadge.png';
import familyBadge from '../images/familyBadge.png';
import employeeBadge from '../images/employeeBadge.png';
import cupBadge from '../images/cupBadge.png';
import firstMedalBadge from '../images/firstMedalBadge.png';
import footballCupBadge from '../images/footballCupBadge.png';
import uniqueStudent from '../images/uniqueStudent.png';
import notesImg from '../images/notes.png'
import messagesImg from '../images/messages.png'

import Calendar from 'moedim';



function HomeContentOverview(){


    
    const [value, setValue] = useState(new Date());
    const [AccountSelected, setAccountSelected] = useState();
    const [privateNotesCount, setprivateNotesCount] = useState();

    let dispatch = useDispatch();

    const {notes, loading} = useSelector( (state) => state.notes );
    const infos = useSelector( (state) => state.infos );
    
    let NotesUlDom = useRef();
    
    const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(changeHeaderPath(`${userLogin.name} ،مرحباً`));
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getInfoReports());
        dispatch(getPrivateNotes());
    }, [dispatch]);

    
    useEffect( () => {

        let accountSelected = infos.accounts.value[0]?.find( (i) => {
            return i.username === userLogin.username
        })
        setAccountSelected(accountSelected);
    }, [infos.accounts.value]);

    useEffect( () => {

        let countN = infos?.privateNotes?.value[0]?.filter( (i) => {
            return i.username === userLogin.username
        })
        setprivateNotesCount(countN);
    }, [infos?.privateNotes.value]);

    function noteClick(e){
        let getIdNote = e.currentTarget.attributes.id_note.value;
        dispatch(NoteSelected({disappear: false, idNote: parseInt(getIdNote)}));
    }



    return (
        <> 
            <div className="Home-Content_Overview">
                <div className="Home-Content_Overview_ThirdSide" style={(userLogin?.active === false) ? {"flex":"1"} : null}>
                    <span className="header">معلومات الحساب</span>
                    <div className="Home-Content_Overview_ThirdSide_Info">
                        <span>Username: <span>{userLogin?.username}</span></span>
                        <span>Name: <span>{userLogin?.name}</span></span>
                        <span>Role: <span>{userLogin?.role}</span></span>
                        <span>Your Class: <span>{(userLogin?.studentClass) ? userLogin?.studentClass : "--"}</span></span>
                        {/* <span>Account Active: <span>{userLogin.active}</span></span> */}
                        <span className={`active`}>Active: <span className={`${(userLogin?.active === true) ? 'active-true' : 'active-false'}`}>{(userLogin?.active === true) ? 'Activated' : 'Not Activated'}</span></span>

                    </div>
                </div>
                {
                    (userLogin?.active === true ) ? (
                        <>
                                        <div className="Home-Content_Overview_SecondSide">
                    <div className="Home-Content_Overview_SecondSide_Calendar">
                        <div className="Home-Content_Overview_SecondSide_Calendar_Chart">
                            <Calendar value={value} onChange={(d) => setValue(d)} />
                            {/* <span className="date">{DateNow}</span> */}
                        </div>
                    </div>
                    <div className="Home-Content_Overview_SecondSide_Badges">
                        <span className="">الشارات</span>
                        <div>
                            {/* <i className="fa-solid fa-wand-magic-sparkles"></i> */}
                            {/* <i className="fa-solid fa-user-group"></i> */}
                            {/* {(userLogin?.role === "teacher") ? (<i className="fa-solid fa-graduation-cap"></i>) : ""}
                            {(userLogin?.role === "student") ? (<i className="fa-solid fa-user-large"></i>) : ""} */}
                            {/* {(userLogin?.role === "teacher") ? (<img alt="" src=""/>) : ""}
                            {(userLogin?.role === "student") ? (<i className="fa-solid fa-user-large"></i>) : ""} */}
                            <img alt="" class={(userLogin?.role === "student") ? "active" : ""} src={studentBadge}/>
                            <img alt="" class={(userLogin?.role === "parent") ? "active" : ""} src={familyBadge}/>
                            <img alt="" class={(userLogin?.role === "teacher" || userLogin?.role === "admin") ? "active" : ""} src={employeeBadge}/>
                            <img alt="" class={(userLogin?.role === "") ? "active" : ""} src={cupBadge}/>
                            <img alt="" class={(userLogin?.role === "") ? "active" : ""} src={firstMedalBadge}/>
                            <img alt="" class={(userLogin?.role === "") ? "active" : ""} src={footballCupBadge}/>
                            <img alt="" class={(userLogin?.role === "student") ? "active" : ""} src={uniqueStudent}/>
                        </div>
                    </div>
                </div>
                <div className="Home-Content_Overview_FirstSide">
                    <div className="Home-Content_Overview_FirstSide_Statistics">
                        <ul className="Home-Content_Overview_FirstSide_Statistics_Ul">
                            <div className="Home-Content_Overview_FirstSide_Statistics_Ul_Header">
                                {/* <h1>other statistics</h1> */}
                                {console.log(AccountSelected)}
                            </div>
                            <li className="Home-Content_Overview_FirstSide_Statistics_Ul_Li">
                                <span>{(AccountSelected?.adminMessage?.length <= 0 || AccountSelected?.adminMessage?.length === undefined ) ? "0" : AccountSelected?.adminMessage?.length}</span>
                                <div className="Home-Content_Overview_FirstSide_Statistics_Ul_Li_Text">
                                    {/* <i className="fa-solid fa-envelope"></i> */}
                                    <img src={messagesImg} alt="" />
                                    <span>الرسائل</span>
                                </div>
                            </li>
                            <li className="Home-Content_Overview_FirstSide_Statistics_Ul_Li">
                                <span>{(privateNotesCount?.length <= 0) ? "0" : privateNotesCount?.length}</span>
                                <div className="Home-Content_Overview_FirstSide_Statistics_Ul_Li_Text">
                                    {/* <i className="fa-solid fa-note-sticky"></i> */}
                                    <img src={notesImg} alt="" />
                                    <span>الملاحظات</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="Home-Content_Overview_FirstSide_Notes">
                        <div className="Home-Content_Overview_FirstSide_Notes_Control">
                            <input placeholder="Search notes" type="text"/>
                            <button>
                                <Link to={'/home/create_note'}>
                                    <i className="fa-solid fa-plus"></i>
                                </Link>
                            </button>
                        </div>
                        <ul ref={NotesUlDom} className="Home-Content_Overview_FirstSide_Notes_Ul">
                            {/* <li className="Home-Content_Overview_FirstSide_Notes_Ul_Li">
                                <span>Title Noteeee 1</span>
                                <p>Lorem ipsum dolor 1</p>
                            </li> */}
                            {
                                (!(infos?.privateNotes?.value[0])) ? <span className="Home-Content_Overview_FirstSide_Notes_Ul_Loading">Loading...</span> : (
                                    infos?.privateNotes?.value[0].map((item, index) => {
                                    // console.log("mappp:", item)
                                    if(item?.username === userLogin?.username){
                                        return (
                                            <li key={item.id} id_note={item.id} className="Home-Content_Overview_FirstSide_Notes_Ul_Li" onClick={(e) => noteClick(e)}>
                                                <span>{item.title}</span>
                                                <p>{item.des}</p>
                                            </li>
                                        )
                                    }
                                })
                                )
                            }
                        </ul>
                    </div>
                </div>
                        </>
                    ) : ""
                }

            </div>
        </>
    )

};



export default HomeContentOverview;
