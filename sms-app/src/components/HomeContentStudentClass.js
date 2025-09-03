import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet} from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/homeContentStudentClass.css';

// Components




function HomeContentStudentClass(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );
    const [AccountSelected, setAccountSelected] = useState();

    let userLogin = JSON.parse(localStorage.getItem('user'));

    let teacherClassSelected = JSON.parse(localStorage.getItem("teacherClassSelected"));


    useEffect(() => {
        dispatch(changeHeaderPath(`فصل: ${(userLogin?.studentClass) || (teacherClassSelected)}`));
    }, [dispatch]);

    useEffect( () => {

        let accountSelected = infos.accounts.value[0]?.find( (i) => {
            return i.username === userLogin.username
        })
    
        setAccountSelected(accountSelected);

    }, [infos.accounts.value]);

    return (
        <> 
            <div className="Home-Content_Overview">
                <Outlet />
            </div>
        </>
    )

};



export default HomeContentStudentClass;



