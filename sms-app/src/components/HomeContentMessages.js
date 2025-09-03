import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/dashboardPosts.css';
import { fetchPosts } from '../state/postsSlice';

// Components




function HomeContentMessages(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );
    const [AccountSelected, setAccountSelected] = useState();

    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(changeHeaderPath("رسائل الإدارة"));
    }, [dispatch]);

    useEffect( () => {

        let accountSelected = infos.accounts.value[0]?.find( (i) => {
            return i.username === userLogin.username
        })
    
        setAccountSelected(accountSelected);

    }, [infos.accounts.value]);

    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Posts">
                    {
                        (AccountSelected === undefined) ? "" : (
                            AccountSelected?.adminMessage?.map( (e, index) => {
                                return (
                                    <div key={index} className="DashBoard-Content_Overview_Posts_Post adminMessagee">
                                    <div className="post-header">
                                        <div className="user">
                                            <i className="fa-solid fa-circle-user"></i>
                                            <div className="texts">
                                                <span className="name" title="Management">Management</span>
                                                <span className="date" title="Thursday, Dec 15, 2022">{e.date}</span>
                                            </div>
                                        </div>
                                        <div className="control">
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </div>
                                    </div>
                                    <div className="post-description">
                                        <p style={{"marginBottom":"10px"}}>{e.title}</p>
                                        <p>
                                            {e.des}
                                        </p>
                                    </div>
                                    <div className="post-images">
            
                                    </div>
                                    </div>
                                )
                            })
                        ) 
                    }
                </div>
            </div>
        </>
    )

};



export default HomeContentMessages;



