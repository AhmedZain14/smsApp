import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts, deletePosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';

import imageBin from "../images/bin2.png";
import imageAddPost from "../images/add.png";


// import './dashboard.css';

// Components

function DashboardContentManageMedia(){

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );
    const {alert} = useSelector( (state) => state.alerts );

    useEffect(() => {
        dispatch(changeHeaderPath("الأخبار"));
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

        if(!(postTitle.current.value == "" || postDes.current.value == "")){
            dispatch(postPosts(
                {
                    title: postTitle.current.value || "",
                    des: postDes.current.value || "",
                    image: postImage.current.files[0]?.name || "",
                    date: DateNow
                }
            ));
            postTitle.current.value = "";
            postDes.current.value = "";
            postImage.current.value = "";
            window.location.reload();
        }else{
            dispatch(makeAlert({message: "!هناك حقل فارغ", display: true}));
        }

    }

    function removeBtn(id){
        dispatch(deletePosts(id)); 
        window.location.reload();
    }

    function goTo(e){
        e.preventDefault();
        navigate(`/dashboard/manage_media/create_post`, {replace: true});
    }
    
    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_ManageMedia">
                    <div className="DashBoard-Content_Overview_ManageMedia_PostsTable">
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Post Title</th>
                                        <th scope="col">Content</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!loading ? (
                                            posts[0]?.map((post, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{post.id}</th>
                                                        <td>{post.title}</td>
                                                        <td className='des'>{post.des}</td>
                                                        <td>{post.date}</td>
                                                        <td>
                                                            <button className="deleteBtn" onClick={(e) => {removeBtn(post.id)}}>
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
                            <img alt="" style={{"height": "25px", "width": "25px"}} src={imageAddPost}/>إنشاء خبر جديد</button>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentManageMedia;
