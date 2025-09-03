import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/dashboardPosts.css';
import { fetchPosts } from '../state/postsSlice';

// Components




function DashboardContentPosts(){

    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );
    const {posts, loading} = useSelector( (state) => state.posts );



    useEffect(() => {
        dispatch(changeHeaderPath("الأخبار"));
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Posts">
                    {
                        (loading === true) ? "" : (
                            posts[0].map( (e, index) => {
                                return (
                                    <div key={index} className="DashBoard-Content_Overview_Posts_Post">
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
                                        <p>
                                            {e.des}
                                        </p>
                                    </div>
                                    <div className="post-images">
            
                                    </div>
                                    <div className="post-control">
                                        {/* <hr /> */}
                                        <div className="info">
                                            <span>0 likes</span>
                                            <span>0 comments</span>
                                        </div>
                                        <hr /> 
                                        <div className="likes-comments">
                                            <span title="Like">
                                                <i className="fa-regular fa-thumbs-up"></i>
                                                Like
                                            </span>
                                            <span title="Write comment">
                                            <i className="fa-regular fa-message"></i>
                                                Comment
                                            </span>
                                        </div>
                                        <hr />
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



export default DashboardContentPosts;



