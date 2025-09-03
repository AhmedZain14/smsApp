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


import imageMoneyCard from "../images/moneyCard.png";
import imageBin from "../images/bin2.png";

// Components

function DashboardContentFinancialAccounts(){

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الحسابات المالية"));
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

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/financial_accounts/create`, {replace: true});
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
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Deposit</th>
                                        <th scope="col">Withdraw</th>
                                        <th scope="col">Date & Time</th>
                                        {JSON.parse(localStorage.getItem("user")).username === "admin" ?(
                                        <th scope="col">Control</th>
                                        ): ""}
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            
                                            infos?.moneySafe?.value[0]?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.title}</td>
                                                        <td className=''>{item.des}</td>
                                                        <td style={{"color": "rgb(61, 194, 100)"}}>{item.deposit} ج.م</td>
                                                        <td style={{"color": "rgb(210, 70, 70)"}}>{item.withdraw} ج.م</td>
                                                        <td>{`[${item.time}] ${item.date}`}</td>
                                                        {JSON.parse(localStorage.getItem("user")).username === "admin" ?(
                                                        <td>
                                                            <button className='deleteBtn' onClick={(e) => { deleteBtn(item.id) }}>
                                                            <img alt="" src={imageBin}/>Delete</button> 
                                                        </td>
                                                        ): ""}
                                                    </tr>
                                                    )})
                                    ) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='control_panel'>
                        <button className='imageBtn' onClick={(e) => { goTo(e) }}>
                        <img alt="" style={{"height": "26px", "width": "25px"}} src={imageMoneyCard}/>سحب وإيداع</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentFinancialAccounts;






