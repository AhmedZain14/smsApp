import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts, deletePosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';

import imageAnnounce from '../images/announce.png'

// import './dashboard.css';

// Components

function DashboardContentManageMediaCreate(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الأخبار / إنشاء خبر جديد"));
        dispatch(fetchPosts());
    }, [dispatch]);

    
    let postTitle = useRef();
    let postDes = useRef();
    let postImage = useRef();

    function createBtn(e){
        e.preventDefault();
        // console.log(postTitle.current.value);
        // console.log(postDes.current.value);
        // console.log(postImage.current.files)
        const DateNow = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

        if(!(postDes.current.value == "")){
            dispatch(postPosts(
                {
                    title: "--",
                    des: postDes.current.value || "",
                    image: postImage.current.files[0]?.name || "",
                    date: DateNow
                }
            ));
            // postTitle.current.value = "";
            postDes.current.value = "";
            postImage.current.value = "";
            // window.location.reload();
        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function removeBtn(id){
        dispatch(deletePosts(id)); 
        window.location.reload();
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_ManageMedia">
                    <div className="DashBoard-Content_Overview_ManageMedia_CreatePost">
                        <form action="">
                            {/* <h1>نشر أخبار جديدة</h1> */}
                            <div className="DashBoard-Content_Overview_ManageMedia_CreatePost_Group">
                                {/* <label htmlFor="postTitle">عنوان الخبر</label> */}
                                {/* <input ref={postTitle} type="text" name='postTitle'/> */}
                                <label htmlFor="description">المحتوى</label>
                                <textarea ref={postDes} type="text" name='description'/>
                                <label htmlFor="file">رفع صورة</label>
                                <input ref={postImage} type="file" name='file' accept="image/png, image/jpeg"/>
                            </div>
                            <div className="DashBoard-Content_Overview_ManageMedia_CreatePost_Control">
                                <button className="addBtn" onClick={(e) => {createBtn(e)}}>
                                <img alt="" style={{"height": "27px", "width": "27px"}} src={imageAnnounce}/>نشر</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentManageMediaCreate;
