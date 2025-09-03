import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate   } from "react-router-dom";
import HomeContent from '../components/HomeContent';
import HomeSidebar from '../components/HomeSidebar';
import './home.css'


function Home(){

    let navigate = useNavigate ();
    const {account} = useSelector( (state) => state.login );
    const infos = useSelector( (state) => state.infos );
    const [AccountSelected, setAccountSelected] = useState();
    const [NoteItemSelected, setNoteItemSelected] = useState();
    
    useEffect( () => {
        if(account){
            if(account.role === "admin"){
                navigate("/dashboard", {replace: true});
            }
        }else{
            navigate("/login", {replace: true});
        }
    }, [account, navigate]); 

    let userLogin = JSON.parse(localStorage.getItem('user'));
    let idOfNoteSelected = JSON.parse(localStorage.getItem('idOfNoteSelected'));
    
    useEffect( () => {

        let accountSelected = infos?.accounts?.value[0]?.find( (i) => {
            return i?.username === userLogin?.username
        })
    
        setAccountSelected(accountSelected);

        AccountSelected?.privateNotes?.forEach((item) => {
            // console.log("mappp:", item)
            // console.log(idOfNoteSelected.idNote);
            if( item.id === parseInt(idOfNoteSelected) ){
                setNoteItemSelected(item);
            }
        })

    }, [idOfNoteSelected, infos.accounts.value, userLogin]);

    return (
        <>
        { (account) ? (
            <div className="home-container">
                    {<HomeContent />}
                    {<HomeSidebar />}
            </div>
        ) : <Navigate to="/login" replace={true}/> }
        </>
    )

};



export default Home;
