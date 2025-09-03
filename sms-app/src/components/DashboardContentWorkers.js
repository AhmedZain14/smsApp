import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/createAccount.css';
import { createWorker, deleteWorker } from '../state/makeSlice';

import imageCreateAccount from "../images/addUser.png";
import imageBin from "../images/bin2.png";

// import './dashboard.css';

// Components

function DashboardContentWorkers(){

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الموظفون"));
    }, [dispatch]);

    
    let nameRef = useRef();
    let jobRef = useRef();

    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(nameRef.current.value == "" || jobRef.current.value == "")){

                let checkTheSameAccount = infos.workers.value[0]?.filter( (acc, index) => {
                    return acc.name === nameRef.current.value;
                });
                
                // let checkAccountAvailable = infos.accounts.value[0]?.filter( (acc, index) => {
                //     return acc.username === usernameRef.current.value;
                // });


                if(checkTheSameAccount?.length > 0){
                    dispatch(makeAlert({message: "هذا الحساب تمت إضافته من قبل. لا يمكن إضافته مرة أخرى", display: true}));
                }else{
                        dispatch(createWorker(
                            {
                                name: nameRef.current.value.toLowerCase(),
                                job: jobRef.current.value.toLowerCase(),
                                dateOfHiring: DateNow
                            }
                        ));
                        nameRef.current.value = "";
                        jobRef.current.value = "";
                        // window.location.reload();
                }



        }else{
            dispatch(makeAlert({message: "ّ!هناك حقل فارغ", display: true}));
        }

    }

    function deleteBtn(v){
        dispatch(deleteWorker(v));
        window.location.reload();
    }

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/workers/create_worker`, {replace: true});
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Accounts_AccountsTable">
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Job</th>
                                        <th scope="col">Date Of Hiring</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            infos.workers.value[0]?.map((acc, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{acc.id}</th>
                                                        <td className=''>{acc.name}</td>
                                                        <td>{acc.job}</td>
                                                        <td>{acc.dateOfHiring}</td>
                                                        <td>
                                                            <button className="deleteBtn" onClick={(e) => { deleteBtn(acc.id) }}>
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
                        <img alt="" style={{"height": "26px", "width": "25px"}} src={imageCreateAccount}/>تسجيل موظف جديد</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentWorkers;






