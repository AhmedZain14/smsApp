import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { json, useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath, getInfoFinancialAccounts, getInfoFinancialBalance } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/financialAccounts.css';
import { createWorker, deleteWorker } from '../state/makeSlice';
import { moneySafeDelete, moneySafeDeposit, moneySafePostCount } from '../state/moneySafeSlice';

import imageDeposite from "../images/deposit.png";
import imageWithdraw from "../images/withdraw.png";

// import './dashboard.css';

// Components

function DashboardContentFinancialAccountsCreate(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الحسابات المالية / سحب وإيداع"));
        // dispatch(getInfoFinancialAccounts());
        // dispatch(getInfoFinancialBalance());
    }, [dispatch]);

    let depositAmountRef = useRef();
    let depositTitleRef = useRef();
    let depositDesRef = useRef();
    let withdrawAmountRef = useRef();
    let withdrawTitleRef = useRef();
    let withdrawDesRef = useRef();

    function depositBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        const TimeNow = new Date();
        // console.log(TimeNow.toLocaleTimeString())
        if(!(depositAmountRef.current.value == "" || depositTitleRef.current.value == "")){

            dispatch(moneySafeDeposit(
                {
                    title: depositTitleRef.current.value,
                    des: (depositDesRef.current.value === "") ? "-" : depositDesRef.current.value,
                    date: DateNow,
                    time: TimeNow.toLocaleTimeString(),
                    deposit: parseFloat(depositAmountRef.current.value),
                    withdraw: 0
                }
            ));

            // dispatch(moneySafePostCount({
            //     value: parseFloat(depositAmountRef.current.value) + parseFloat(infos?.moneySafe?.count)
            // }));

            localStorage.setItem("moneySafeCount", JSON.stringify( parseFloat(depositAmountRef.current.value) + parseFloat((parseFloat(localStorage.getItem("moneySafeCount")) || 0.000)) ))

            // dispatch(getInfoFinancialAccounts());
            depositAmountRef.current.value = "";
            depositTitleRef.current.value = "";
            depositDesRef.current.value = "";
            window.location.reload();
   
        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function withdrawBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        const TimeNow = new Date();
        // console.log(TimeNow.toLocaleTimeString())
        if(!(withdrawAmountRef.current.value == "" || withdrawTitleRef.current.value == "")){
            
            if(parseFloat(localStorage.getItem("moneySafeCount")) <= 0){
                dispatch(makeAlert({message: "!عملية السحب لم تنجح. لأن الخزانة فارغه", display: true}));
            }else{
                dispatch(moneySafeDeposit(
                    {
                        title: withdrawTitleRef.current.value,
                        des: (withdrawDesRef.current.value === "") ? "-" : withdrawDesRef.current.value,
                        date: DateNow,
                        time: TimeNow.toLocaleTimeString(),
                        deposit: 0,
                        withdraw: parseFloat(withdrawAmountRef.current.value)
                    }
                ));

                // dispatch(moneySafePostCount({
                //     value: parseFloat(infos?.moneySafe?.count) - parseFloat(withdrawAmountRef.current.value)
                // }));

                localStorage.setItem("moneySafeCount", JSON.stringify( parseFloat((parseFloat(localStorage.getItem("moneySafeCount")))) - parseFloat(withdrawAmountRef.current.value)))

                // dispatch(getInfoFinancialAccounts());
                // dispatch(getInfoFinancialBalance());
                withdrawAmountRef.current.value = "";
                withdrawTitleRef.current.value = "";
                withdrawDesRef.current.value = "";
                window.location.reload();
            }
   
        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function deleteBtn(v){
        dispatch(moneySafeDelete(v));
        window.location.reload();
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_FinancialAccounts">
                    <div className="DashBoard-Content_Overview_FinancialAccounts_Create">
                        <form action="">
                            <h1>إيداع مال</h1>
                            <div className="DashBoard-Content_Overview_FinancialAccounts_Create_Group">
                                <label htmlFor="depositAmount">المبلغ المالي</label>
                                <input ref={depositAmountRef} type="text" name='depositAmount'/>
                                <label htmlFor="depositTitle">أسم العملية</label>
                                <input ref={depositTitleRef} type="text" name='depositTitle'/>
                                <label htmlFor="depositDes">سبب العملية</label>
                                <input ref={depositDesRef} type="text" name='depositDes'/>
                            </div>
                            <h1>سحب أموال</h1>
                            <div className="DashBoard-Content_Overview_FinancialAccounts_Create_Group">
                                <label htmlFor="depositAmount">المبلغ المالي</label>
                                <input ref={withdrawAmountRef} type="text" name='withdrawAmount'/>
                                <label htmlFor="depositTitle">أسم العملية</label>
                                <input ref={withdrawTitleRef} type="text" name='withdrawTitle'/>
                                <label htmlFor="withdrawDes">سبب العملية</label>
                                <input ref={withdrawDesRef} type="text" name='withdrawtDes'/>
                            </div>
                            <div className="DashBoard-Content_Overview_FinancialAccounts_Create_Control">
                                <button className='addBtn imageBtn' onClick={(e) => {depositBtn(e)}}>
                                <img alt="" style={{"height": "27px", "width": "27px"}} src={imageDeposite}/>إيداع</button>
                                <button className='dangBtn imageBtn' onClick={(e) => {withdrawBtn(e)}}>
                                <img alt="" style={{"height": "27px", "width": "27px"}} src={imageWithdraw}/>سحب</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentFinancialAccountsCreate;






