import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/homeContentGrades.css'




function HomeContentShowGrades(){

    let [subjects, setSubjects] = useState([]);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    const [AccountSel, setAccountSel] = useState([]);
    const [StudentsUsername, setStudentsUsername] = useState([]);

    let userLogin = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(changeHeaderPath("الدرجات"));
        // dispatch(getInfoReports());
    }, [dispatch]);


    useEffect(() => {

            let accountSelected = infos?.accounts?.value[0]?.filter( (acc, index) => {
                return acc?.username === userLogin?.username;
            });

            setAccountSel(accountSelected);

            console.log(AccountSel)

    }, [infos.accounts.value, userLogin.username]);


    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Reports">
                    <div className="DashBoard-Content_Overview_Grades_GradesTable">
                        <div className="showTable">
                            <table className="table tableFixed">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Current Grade</th>
                                        <th scope="col">Max Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!infos.loading ? (
                                            AccountSel?.map((acc, index) => {
                                                return (
                                                    acc?.grades?.map((a, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <th scope="row">{i + 1}</th>
                                                                <th scope="row">{a.date}</th>
                                                                <th scope="row">{a.subject}</th>
                                                                <th scope="row">{a.currentGrade}</th>
                                                                <th scope="row">{a.maxGrade}</th>
                                                            </tr>
                                                        )
                                                    })
                                                )

                                                })
                                    ) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};



export default HomeContentShowGrades;






