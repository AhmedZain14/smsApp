import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/financialAccounts.css';
import { createWorker, deleteWorker } from '../state/makeSlice';
import { DeleteFinancialReceipt, FetchFinancialReceipt, financialReceiptPost, moneySafeDelete, moneySafeDeposit, moneySafePostCount } from '../state/moneySafeSlice';


import imageAddPost from "../images/add.png";
import imageBin from "../images/bin2.png";
import imagePrinter from "../images/printer.png";

// Components

function DashboardContentFinancialReceipts(){

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );
    const {financialReceipt} = useSelector( (state) => state.moneySafe );

    useEffect(() => {
        dispatch(changeHeaderPath("الفواتير المالية"));
        dispatch(FetchFinancialReceipt())
    }, [dispatch]);

    
    let StudentUsernameRef = useRef();
    let StudentNameRef = useRef();
    let ExpensesAmountRef = useRef();


    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(StudentUsernameRef.current.value == "" || StudentNameRef.current.value == "" || ExpensesAmountRef.current.value == "")){

                let checkTheSameAccount = infos.accounts.value[0]?.filter( (acc, index) => {
                    return acc.username === StudentUsernameRef.current.value;
                });
                
                // let checkAccountAvailable = infos.accounts.value[0]?.filter( (acc, index) => {
                //     return acc.username === usernameRef.current.value;
                // });

                if(checkTheSameAccount?.length <= 0){
                    dispatch(makeAlert({message: ".هذا الحساب غير صحيح. من فضلك أدخل حساب صحيح", display: true}));
                }else{
                        dispatch(financialReceiptPost(
                            {
                                username: StudentUsernameRef.current.value,
                                name: StudentNameRef.current.value,
                                amount: parseFloat(ExpensesAmountRef.current.value),
                                date: DateNow
                              }
                        ));
                        StudentUsernameRef.current.value = "";
                        StudentNameRef.current.value = "";
                        ExpensesAmountRef.current.value = "";
                        window.location.reload();
                }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }


    function deleteBtn(v){
        dispatch(DeleteFinancialReceipt(v));
        window.location.reload();
    }

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/financial_receipts/create`, {replace: true});
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_FinancialAccounts">
                    <div className="DashBoard-Content_Overview_FinancialAccounts_FinancialAccountsTable">
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Student Username</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            financialReceipt?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.username}</td>
                                                        <td className=''>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.date}</td>
                                                        <td className='control_buttons'>
                                                            {JSON.parse(localStorage.getItem("user")).username === "admin" ?(
                                                                <button className='deleteBtn' onClick={(e) => { deleteBtn(item.id) }}>
                                                                    <img alt="" src={imageBin}/>Delete</button> 
                                                            ): ""}
                                                            <button className='imageBtn' onClick={(e) => { }}>
                                                                    <img alt="" src={imagePrinter} style={{"height": "18px", "width": "18px"}}/>Print</button>
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
                        <img alt="" style={{"height": "25px", "width": "25px"}} src={imageAddPost}/>تسجيل فاتورة جديدة</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentFinancialReceipts;






