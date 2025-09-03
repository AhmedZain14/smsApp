import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/dashboardShowAccount.css';
import { fetchPosts } from '../state/postsSlice';
import { accountSetting } from '../state/settingSlice';
import { deleteAccount } from '../state/makeSlice';
import { makeAlert } from '../state/alertSlice';

// Components




function DashboardContentShowAccount(){

    let navigate = useNavigate ();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );

    let [AccountInfo, setAccountInfo] = useState();
    let [AccountTeacher, setAccountTeacher] = useState();
    let [AccountActive, setAccountActive] = useState();


    useEffect(() => {
        dispatch(changeHeaderPath("معلومات عن الحساب"));
    }, [dispatch]);

    useEffect(() => {
        
        let accountId = JSON.parse(localStorage.getItem("ShowAccount"));
    
        let accountSelected = infos.accounts.value[0]?.find( (acc, index) => {
            return acc.id === accountId
        });

        let accountTeacher = infos.teachers.ActiveTeachers?.find( (acc, index) => {
            return acc.username === accountSelected?.username
        });

        // console.log(accountTeacher)

        setAccountTeacher(accountTeacher);

        setAccountInfo(accountSelected);
        // setAccountActive(accountSelected?.active)
        
    }, [infos.accounts.value[0], infos.teachers.ActiveTeachers]);


    let usernameRef = useRef();
    let nameRef = useRef();
    let passwordRef = useRef();
    let StudentClassRef = useRef();
    

    function editBtn(e){
        e.preventDefault();

        // if(!(usernameRef.current.value == "" || nameRef.current.value == "" || passwordRef.current.value == "")){

            let oldAccountObject = {...AccountInfo}

            console.log(oldAccountObject)
            // console.log(oldAccountObject.username)
            // console.log(usernameRef.current.value)
            
            oldAccountObject.username = usernameRef.current.value || oldAccountObject.username;
            oldAccountObject.name = nameRef.current.value || oldAccountObject.name;
            oldAccountObject.password = passwordRef.current.value || oldAccountObject.password;

            oldAccountObject.studentClass = StudentClassRef.current.value || oldAccountObject.studentClass;
            
            // console.log(oldAccountObject)

            if(oldAccountObject.role !== "student" && StudentClassRef.current.value !== ""){
                dispatch(makeAlert({message: "!لا تستطيع تعديل فصل الطالب، لأن هذا الحساب ليس طالباً", display: true}));
            }else{
                dispatch(accountSetting(
                    {
                        id: AccountInfo.id,
                        value: oldAccountObject
                    }
                ));
    
                usernameRef.current.value = "";
                nameRef.current.value = "";
                passwordRef.current.value = "";
                StudentClassRef.current.value = "";
            }

            // window.location.reload();
        // }

    }

    function ToggleActive(e){
        e.preventDefault();

        let oldAccountObject = {...AccountInfo}
        
        oldAccountObject.active = (oldAccountObject.active === true) ? false : true;

        dispatch(accountSetting(
            {
                id: AccountInfo.id,
                value: oldAccountObject
            }
        ));

        window.location.reload();
        
    }

    function ToggleBan(e){
        e.preventDefault();

        let oldAccountObject = {...AccountInfo}
        
        oldAccountObject.ban = (oldAccountObject.ban === true) ? false : true;

        dispatch(accountSetting(
            {
                id: AccountInfo.id,
                value: oldAccountObject
            }
        ));

        window.location.reload();
        
    }

    function deleteBtn(e, id){
        dispatch(deleteAccount(id));
        window.location.reload();
        // navigate("/dashboard/accounts", {replace: true});
    }

    return (
        <> 
            <div className="DashBoard-Content_Overview ShowAccounts">
                <div className="DashBoard-Content_Overview_Accounts_Info">
                    <span className='id'>رقم الحساب: <span>{AccountInfo?.id}</span></span>
                    <span className='username'><span>{AccountInfo?.username}</span> :أسم الحساب</span>
                    <span className='name'><span>{AccountInfo?.name}</span> :أسم الشخص</span>
                    <span className='password'>كلمة المرور: <span>{AccountInfo?.password}</span></span>
                    <span className='role'><span>{AccountInfo?.role}</span> :الصلاحية</span>
                    <span className={`active`}><span className={`${(AccountInfo?.active === true) ? 'active-true' : 'active-false'}`}>{(AccountInfo?.active === true) ? 'Activated' : 'Not Activated'}</span> :التفعيل</span>
                    <span className='date'><span>{AccountInfo?.createDate}</span> :تاريخ الإنشاء</span>
                    <span className={`active`}><span className={`${(AccountInfo?.ban === false) ? 'active-true' : 'active-false'}`}>{(AccountInfo?.ban === false) ? 'Not banned' : 'Banned'}</span> :الحظر</span>
                    <hr />
                    <span><span>{(AccountInfo?.studentClass != null) ? AccountInfo?.studentClass : ""}</span> :فصل الطالب</span>
                    <span><span>{(AccountTeacher?.subject != null) ? AccountTeacher?.subject : ""}</span> :المادة الدراسية للمعلم</span>
                    <span className='teacherClasses'>
                        <span>{(AccountTeacher?.classes != null) ? (
                            AccountTeacher?.classes.map((c, index) => {
                                return <span key={index} className="teacherClasses-className">{c}</span>
                            })
                        ) : ""}</span> :فصول المعلم
                    </span>
                    <span>
                        {
                            (AccountInfo?.parentStudent?.length <= 0) ? "" : (
                                AccountInfo?.parentStudent?.map((s, i) => {
                                    return (
                                        <span>{(i === 0) ? "" : "-"} [S:{s}]</span>
                                    )
                                })
                            )
                        } :أبناء ولي الأمر
                    </span>
                </div>
                <div className="DashBoard-Content_Overview_Accounts">
                    <div className="DashBoard-Content_Overview_Accounts_CreateAccount">
                        <form action="">
                            <h1>تعديل الحساب</h1>
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Group">
                                <label htmlFor="Username">أسم الحساب</label>
                                <input ref={usernameRef} type="text" name='Username'/>
                                <label htmlFor="Name">أسم الشخص</label>
                                <input ref={nameRef} type="text" name='Name'/>
                                <label htmlFor="Password">كلمة المرور</label>
                                <input ref={passwordRef} type="text" name='Password'/>
                                <label htmlFor="StudentClass">فصل الطالب ( للطلاب فقط )</label>
                                <input ref={StudentClassRef} type="text" name='Password'/>
                            </div>
                            <div className="DashBoard-Content_Overview_Accounts_CreateAccount_Control">
                                <button onClick={(e) => {editBtn(e)}}>تعديل</button>
                                <button onClick={(e) => {ToggleActive(e)}}>تفعيل / إلغاء التفعيل</button>
                                <button className="ban" onClick={(e) => {ToggleBan(e)}}>حظر / إلغاء الحظر</button>
                                <button onClick={(e) => {deleteBtn(e, AccountInfo?.id)}}>حذف الحساب</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentShowAccount;



