import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createAccount.css';
import { createAccount } from '../state/makeSlice';

import imageDetails from "../images/details.png";
import imageCreateAccount from "../images/addUser.png";
import imageAdminBadge from "../images/adminBadge.png";
import imageStudentBadge from "../images/studentBadge.png";
import imageemployeeBadge from "../images/employeeBadge.png";
import imageParentBadge from "../images/familyBadge.png";

// import './dashboard.css';

// Components

function DashboardContentAccounts(){

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert, loading} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("حسابات المستخدمين"));
    }, [dispatch]);

    
    let usernameRef = useRef();
    let nameRef = useRef();
    let passwordRef = useRef();
    let roleRef = useRef();
    let stageRef = useRef();
    let parentStudentRef = useRef();

    let searchByUsernameRef = useRef();
    const [searchByUsername, setSearchByUsername] = useState('');
    const [filterdSearchByUsername, setFilterdSearchByUsername] = useState();

    let searchByRoleRef = useRef();
    const [searchByRole, setSearchByRole] = useState('');
    const [filterdSearchByRole, setFilterdSearchByRole] = useState();


    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(usernameRef.current.value == "" || nameRef.current.value == "" || passwordRef.current.value == "" || roleRef.current.value == "")){


                let checkTheSameAccount = infos.accounts.value[0]?.filter( (acc, index) => {
                    return acc.username === usernameRef.current.value;
                });


                
                if(checkTheSameAccount?.length > 0){
                    dispatch(makeAlert({message: "أسم الحساب هذا موجود بالفعل. قم بإختيار أسم حساب آخر", display: true}));
                }else{
                    if(!(roleRef.current.value.toLowerCase() == "student" || roleRef.current.value.toLowerCase() == "admin" || roleRef.current.value.toLowerCase() == "parent" || roleRef.current.value.toLowerCase() == "teacher")){
                        dispatch(makeAlert({message: "حقل الصلاحية يجب أن يكون طالب أو معلم أو ولي أمر أو مسؤول", display: true}));
                    }else{
                        dispatch(createAccount(
                            {
                                username: usernameRef.current.value.toLowerCase(),
                                password: passwordRef.current.value.toLowerCase(),
                                name: nameRef.current.value.toLowerCase(),
                                active: true,
                                createDate: DateNow,
                                role: roleRef.current.value.toLowerCase(),
                                studentClass: stageRef.current.value || null,
                                parentStudent: (parentStudentRef.current.value.toLowerCase()).split(",") || null,
                                class: {
                                  classes: [],
                                  subject: null
                                },
                                privateNotes: []
                            }
                        ));
                        usernameRef.current.value = "";
                        passwordRef.current.value = "";
                        nameRef.current.value = "";
                        roleRef.current.value = "";
                        parentStudentRef.current.value = "";
                        stageRef.current.value = "";
                        window.location.reload();
                    }
                }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function showBtn(e, id){
        e.preventDefault();
        navigate(`/dashboard/accounts/show`, {replace: true});
        localStorage.setItem("ShowAccount", JSON.stringify(id));
    }

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/accounts/create_account`, {replace: true});
    }

    const searchByUsernameHandleChange = (event) => {
        setSearchByUsername(event.target.value);
        // console.log('value is:', event.target.value);
      };

      const searchByRoleHandleChange = (event) => {
        // setFilterdSearchByUsername([]);
        setSearchByRole(event.target.value);
        console.log('value is:', event.target.value);
      };

      useEffect(() => {
        
        const regex = new RegExp(`^${searchByUsername}`);

        const usernameFilter = infos.accounts.value[0]?.filter(x => regex.test(x.username));

        // let usernameFilter = infos.accounts.value[0]?.filter((item, index) => {
        //     return item.username === searchByUsername 
        // });

        let roleFilter = infos.accounts.value[0]?.filter((item, index) => {
            return item.role === searchByRole 
        });

        console.log("Filter Username:  ", usernameFilter);
        console.log("Filter roleFilter:  ", roleFilter);

        if((searchByRole.length === 0)){
            setFilterdSearchByRole([]);
            setFilterdSearchByUsername(usernameFilter);
        }else{
            setFilterdSearchByRole(roleFilter);
            setFilterdSearchByUsername([]);
        }

        // if((searchByUsername.length === 0)){
        //     setFilterdSearchByRole(roleFilter);
        // }else{
        //     setFilterdSearchByRole([]);
        // }
        // setFilterdSearchByRole(roleFilter);

    }, [infos.accounts.value, searchByUsername, searchByRole]);
      
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Accounts_AccountsTable">
                            <div className="searchBox">
                                <input ref={searchByUsernameRef} onChange={searchByUsernameHandleChange} type="text" name='search' placeholder='search by username'/>
                                <input ref={searchByRoleRef} onChange={searchByRoleHandleChange} type="text" name='search' placeholder='search by role'/>
                            </div>
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Account Status</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    (!(filterdSearchByUsername?.length === 0)) ? (
                                        <>
                                            {(
                                                filterdSearchByUsername?.map((acc, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{acc.id}</th>
                                                            <td>{acc.username}</td>

                                                            <td className='status'><span style={
                                                            {"color": `${
                                                                (acc.active === true) ? 'rgb(80, 115, 230)' : 'rgb(230, 80, 80)'
                                                            }`,
                                                            "background": `${
                                                                (acc.active === true) ? 'rgba(80, 115, 230, 0.350)' : 'rgba(230, 80, 80, 0.350)' 
                                                            }`
                                                            }}>{(acc.active === true) ? "Activated" : "Not Activated"}</span></td>

                                                            <td className=''>{acc.name}</td>
                                                            <td className='ImageCell'>{
                                                            (acc.role === "admin") ? (<>
                                                            <img alt="" src={imageAdminBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : (acc.role === "student") ? (<>
                                                            <img alt="" src={imageStudentBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : (acc.role === "teacher") ? (<>
                                                            <img alt="" src={imageemployeeBadge} style={{"height": "22px", "width": "22px"}}/>{acc.role}
                                                            </>) : (acc.role === "parent") ? (<>
                                                            <img alt="" src={imageParentBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : ""
                                                            }</td>
                                                            <td>
                                                                <button className="imageBtn" onClick={(e) => {showBtn(e, acc.id)}}><img alt="" src={imageDetails}/>Show Details</button>
                                                            </td>
                                                        </tr>
                                                        )})
                                        )}
                                        </>
                                    ) : (!(filterdSearchByRole?.length === 0)) ? (
                                        <>
                                            {(
                                                filterdSearchByRole?.map((acc, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{acc.id}</th>
                                                            <td>{acc.username}</td>

                                                            <td className='status'><span style={
                                                            {"color": `${
                                                                (acc.active === true) ? 'rgb(80, 115, 230)' : 'rgb(230, 80, 80)'
                                                            }`,
                                                            "background": `${
                                                                (acc.active === true) ? 'rgba(80, 115, 230, 0.350)' : 'rgba(230, 80, 80, 0.350)' 
                                                            }`
                                                            }}>{(acc.active === true) ? "Activated" : "Not Activated"}</span></td>

                                                            <td className=''>{acc.name}</td>
                                                            <td className='ImageCell'>{
                                                            (acc.role === "admin") ? (<>
                                                            <img alt="" src={imageAdminBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : (acc.role === "student") ? (<>
                                                            <img alt="" src={imageStudentBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : (acc.role === "teacher") ? (<>
                                                            <img alt="" src={imageemployeeBadge} style={{"height": "22px", "width": "22px"}}/>{acc.role}
                                                            </>) : (acc.role === "parent") ? (<>
                                                            <img alt="" src={imageParentBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : ""
                                                            }</td>
                                                            <td>
                                                                <button className="imageBtn" onClick={(e) => {showBtn(e, acc.id)}}><img alt="" src={imageDetails}/>Show Details</button>
                                                            </td>
                                                        </tr>
                                                        )})
                                        )}
                                        </>
                                    ) : (
                                    <>
                                        {!infos.loading ? (
                                                infos.accounts.value[0]?.map((acc, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{acc.id}</th>
                                                            <td>{acc.username}</td>

                                                            <td className='status'><span style={
                                                            {"color": `${
                                                                (acc.active === true) ? 'rgb(80, 115, 230)' : 'rgb(230, 80, 80)'
                                                            }`,
                                                            "background": `${
                                                                (acc.active === true) ? 'rgba(80, 115, 230, 0.350)' : 'rgba(230, 80, 80, 0.350)' 
                                                            }`
                                                            }}>{(acc.active === true) ? "Activated" : "Not Activated"}</span></td>

                                                            <td className=''>{acc.name}</td>
                                                            <td className='ImageCell'>{
                                                            (acc.role === "admin") ? (<>
                                                            <img alt="" src={imageAdminBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : (acc.role === "student") ? (<>
                                                            <img alt="" src={imageStudentBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : (acc.role === "teacher") ? (<>
                                                            <img alt="" src={imageemployeeBadge} style={{"height": "22px", "width": "22px"}}/>{acc.role}
                                                            </>) : (acc.role === "parent") ? (<>
                                                            <img alt="" src={imageParentBadge} style={{"height": "25px", "width": "25px"}}/>{acc.role}
                                                            </>) : ""
                                                            }</td>
                                                            <td>
                                                                <button className="imageBtn" onClick={(e) => {showBtn(e, acc.id)}}><img alt="" src={imageDetails}/>Show Details</button>
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
                        <img alt="" style={{"height": "26px", "width": "25px"}} src={imageCreateAccount}/>إنشاء حساب جديد</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentAccounts;
