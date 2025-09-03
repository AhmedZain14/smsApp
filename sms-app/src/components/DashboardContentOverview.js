import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import { Link } from "react-router-dom";
import complaintImg from '../images/complaint.png'
import notesImg from '../images/notes.png'

import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';

// import './dashboard.css';

// Components

import {CanvasJSChart} from 'canvasjs-react-charts'
// import CanvasJSReact from './';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function DashboardContentOverview(){


    
    
    let dispatch = useDispatch();

    const {notes, loading} = useSelector( (state) => state.notes );
    const infos = useSelector( (state) => state.infos );
    
    let NotesUlDom = useRef();
    let [Note, setNote] = useState({
        disappear: true,
        title: null, // title of note
        des: null // content of note
    });
    


    const options = {
        theme: "light2",
        animationEnabled: true,
        exportFileName: "",
        exportEnabled: false,
        title:{
            text: ""
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "outside",
            dataPoints: [
                { y: infos.accounts.count, label: "Accounts" },
                { y: infos.teachers.count, label: "Teachers" },
                { y: infos.students.count, label: "Students" },
                { y: infos.parents.count, label: "Parents" },
                { y: infos.workers.count, label: "Workers" },
            ]
        }]
    }


    // let [ChartState, setChartState] = useState({
    //     series: [25, 15, 44, 55, 41, 17],
    //     chart: {
    //     width: '100%',
    //     type: 'pie',
    //   },
    //   labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //   theme: {
    //     monochrome: {
    //       enabled: true
    //     }
    //   },
    //   plotOptions: {
    //     pie: {
    //       dataLabels: {
    //         offset: -5
    //       }
    //     }
    //   },
    //   title: {
    //     text: "Monochrome Pie"
    //   },
    //   dataLabels: {
    //     formatter(val, opts) {
    //       const name = opts.w.globals.labels[opts.seriesIndex]
    //       return [name, val.toFixed(1) + '%']
    //     }
    //   },
    //   legend: {
    //     show: false
    //   }
    // });

    useEffect(() => {
        dispatch(changeHeaderPath("الواجهة"));
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(fetchNotes());
        dispatch(getInfoNotes());
        dispatch(getInfoReports());
    }, [dispatch]);
    
    // useEffect( () => {
        
    //     let NotesLiDom = NotesUlDom.current.children;
        
    //     let LiArray = [...NotesLiDom]
        
    //     LiArray.forEach((item) => {
    //         // console.log(item);
    //         item.addEventListener("click", function(e){
    //             console.log(e);
    //             console.log(e.currentTarget.children[0].innerHTML);
    //             console.log(e.currentTarget.children[1].innerHTML);
    //             let NoteObject = {
    //                 disappear: false,
    //                 title: e.currentTarget.children[0].innerHTML, // title of note
    //                 des: e.currentTarget.children[1].innerHTML // content of note
    //             };
    //             setNote(NoteObject);
    //         });
    //     });


    // }, []);


    function noteClick(e){
        console.log("note clicked");
        console.log(e.currentTarget.attributes.id_note.value);
        let getIdNote = e.currentTarget.attributes.id_note.value;
        dispatch(NoteSelected({disappear: false, idNote: getIdNote}));
    }



    return (
        <> 
            <div className="DashBoard-Content_Overview">
                <div className="DashBoard-Content_Overview_SecondSide">
                    <div className="DashBoard-Content_Overview_SecondSide_Charts">
                        <div className="DashBoard-Content_Overview_SecondSide_Charts_Chart">
                            <CanvasJSChart options={options}/>
                        </div>
                    </div>
                    {/* <div className="DashBoard-Content_Overview_SecondSide_Logs">

                    </div> */}
                </div>
                <div className="DashBoard-Content_Overview_FirstSide">
                    <div className="DashBoard-Content_Overview_FirstSide_Statistics">
                        <ul className="DashBoard-Content_Overview_FirstSide_Statistics_Ul">
                            <div className="DashBoard-Content_Overview_FirstSide_Statistics_Ul_Header">
                                <h1>بعض الأحصائيات</h1>
                            </div>
                            <li className="DashBoard-Content_Overview_FirstSide_Statistics_Ul_Li">
                                <span>{(infos.reports.count === 0 ? "0" : infos.reports.count)}</span>
                                <div className="DashBoard-Content_Overview_FirstSide_Statistics_Ul_Li_Text">
                                    {/* <i className="fa-solid fa-file-lines"></i> */}
                                    <img src={complaintImg} alt="" />
                                    <span>البلاغات</span>
                                </div>
                            </li>
                            <li className="DashBoard-Content_Overview_FirstSide_Statistics_Ul_Li">
                                <span>{(infos.notes.count === 0 ? "0" : infos.notes.count)}</span>
                                <div className="DashBoard-Content_Overview_FirstSide_Statistics_Ul_Li_Text">
                                    {/* <i className="fa-solid fa-note-sticky"></i> */}
                                    <img src={notesImg} alt="" />
                                    <span>الملاحظات</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="DashBoard-Content_Overview_FirstSide_Notes">
                        <div className="DashBoard-Content_Overview_FirstSide_Notes_Control">
                            <input placeholder="Search notes" type="text"/>
                            <button>
                                <Link to={'/dashboard/notes'}>
                                    <i className="fa-solid fa-plus"></i>
                                </Link>
                            </button>
                        </div>
                        <ul ref={NotesUlDom} className="DashBoard-Content_Overview_FirstSide_Notes_Ul">
                            {/* <li className="DashBoard-Content_Overview_FirstSide_Notes_Ul_Li">
                                <span>Title Noteeee 1</span>
                                <p>Lorem ipsum dolor 1</p>
                            </li> */}
                            {
                                (loading === true ) ? <span className="DashBoard-Content_Overview_FirstSide_Notes_Ul_Loading">Loading...</span> : (
                                notes[0]?.map((item, index) => {
                                    // console.log("mappp:", item)
                                    return (
                                        <li key={item.id} id_note={item.id} className="DashBoard-Content_Overview_FirstSide_Notes_Ul_Li" onClick={(e) => noteClick(e)}>
                                            <span>{item.title}</span>
                                            <p>{item.des}</p>
                                        </li>
                                    )
                                })
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

};



export default DashboardContentOverview;
