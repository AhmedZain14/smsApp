import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { postPosts, fetchPosts } from '../state/postsSlice';
import { makeAlert } from '../state/alertSlice';
import '../pages/homeContentGrades.css'




function HomeContentParentGrades(){

    let [subjects, setSubjects] = useState([]);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const infos = useSelector( (state) => state.infos );
    const {alert} = useSelector( (state) => state.alerts );

    const [AccountSel, setAccountSel] = useState();
    const [StudentsUsername, setStudentsUsername] = useState([]);

    
    useEffect(() => {
        dispatch(changeHeaderPath("درجات الأبناء"));
        // dispatch(getInfoReports());
    }, [dispatch]);
    
    
    useEffect(() => {
        
        // console.log(userLogin?.parentStudent)
        
        let userLogin = JSON.parse(localStorage.getItem('user'));

       let studentSel = userLogin?.parentStudent?.filter( (acc, index) => {
            return acc !== "" || acc !== undefined
        });
    
        setStudentsUsername([...studentSel]);

        console.log(studentSel)

    }, []);


    useEffect(() => {

            let accountSelected = infos?.accounts?.value[0]?.filter( (acc, index) => {
                return (StudentsUsername.includes(`${acc?.username}`)) ? acc : false;
            });

            // console.log(accountSelected)

            setAccountSel(accountSelected);

            // console.log(AccountSel)

    }, [infos.accounts.value, StudentsUsername]);


    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_Reports">
                    {
                        AccountSel?.map((acc, id) => {
                            return (
                            // <h1 key={id}>{acc.name}</h1>
                            <div key={id} className="DashBoard-Content_Overview_Grades_GradesTable">
                                <div className="showTable">
                                    <table className="table tableFixed">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Current Grade</th>
                                                <th scope="col">Max Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!infos.loading ? (
                                                    acc?.grades?.map((el, index) => {
                                                        // console.log("accc", acc)
                                                        // console.log("geel", gEl)
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <th scope="row">{acc.name}</th>
                                                                <th scope="row">{el.date}</th>
                                                                <th scope="row">{el.subject}</th>
                                                                <th scope="row">{el.currentGrade}</th>
                                                                <th scope="row">{el.maxGrade}</th>
                                                            </tr>
                                                        )
                                                        })
                                            ) : ""}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

};



export default HomeContentParentGrades;






