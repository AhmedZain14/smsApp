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


import imageCreateAccount from "../images/plus.png";

// Components

function DashboardContentFinancialReceiptsCreate(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );
    const {financialReceipt} = useSelector( (state) => state.moneySafe );

    useEffect(() => {
        dispatch(changeHeaderPath("الفواتير المالية / تسجيل فاتورة جديدة"));
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
                        // window.location.reload();
                }

        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }


    function deleteBtn(v){
        dispatch(DeleteFinancialReceipt(v));
        window.location.reload();
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_FinancialAccounts">
                    <div className="DashBoard-Content_Overview_FinancialAccounts_Create">
                        <form action="">
                            {/* <h1>إنشاء فاتورة</h1> */}
                            <div className="DashBoard-Content_Overview_FinancialAccounts_Create_Group">
                                <label htmlFor="StudentUsername">أسم حساب الطالب</label>
                                <input ref={StudentUsernameRef} type="text" name='StudentUsername'/>
                                <label htmlFor="StudentName">أسم الطالب</label>
                                <input ref={StudentNameRef} type="text" name='StudentName'/>
                                <label htmlFor="ExpensesAmount">المبلغ</label>
                                <input ref={ExpensesAmountRef} type="text" name='ExpensesAmount'/>
                            </div>
                            <div className="DashBoard-Content_Overview_FinancialAccounts_Create_Control">
                                <button className='addBtn' onClick={(e) => {createBtn(e)}}>
                                <img alt="" style={{"height": "20px", "width": "20px"}} src={imageCreateAccount}/>إنشاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentFinancialReceiptsCreate;






