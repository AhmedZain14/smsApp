import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchNotes, NoteSelected } from '../state/notesSlice';
import { getInfoNotes, getInfoReports, changeHeaderPath } from '../state/infoSlice';
import '../pages/dashboardContentCalc.css';

// Components




function DashboardContentCalc(){
    
    let dispatch = useDispatch();
    const infos = useSelector( (state) => state.infos );


    useEffect(() => {
        dispatch(changeHeaderPath("آلة حاسبة"));
    }, [dispatch]);

    // let allSpan = useRef();

    // console.log(allSpan.current);

    // Access Any Element By This Object

    // let doc = {
    //     select: (a) => { return document.querySelector(a) },
    //     selectAll: (a) => { return document.querySelectorAll(a) },
    //     translateX: (a, b) => { return document.querySelector(a).style.transform  = `translateY(-50%) translateX(${b}%)` },
    //     getAtt: (a, b) => { return document.querySelector(a).getAttribute(b)}
    // }
    
    // Turn ON/OFF Button When Clicked
    // doc.select('.turn').onclick = function(){
    //     if( !(doc.select('.turn').classList.contains('active')) ){
    //     doc.select('.turn').classList.add("active");
    //     doc.translateX('.turn span', (100 + 20));
    //     doc.select('.sound').play();
    //     doc.select('.sound').volume = 0.3;
    //     }else{
    //     doc.select('.turn').classList.remove("active");
    //     doc.translateX('.turn span', 20);
    //     doc.select('.sound').pause();
        // doc.select('.sound').currentTime = 0;
    //     }
    // };
  
    // let numberToCalc = [];
    // doc.selectAll('.controls span').forEach( (ele) => {
        
    //     ele.addEventListener('click', (e) => {

    //     if( ele.hasAttribute("data-operator") ){
    //         AddNumbers(ele.getAttribute("data-operator"));
    //         numberToCalc.push(ele.getAttribute("data-operator"));
    //         console.log(numberToCalc.join(""));
    //     }
    //     if( ele.getAttribute("id") == "clear"){ RemoveAll(); numberToCalc = [] };
    //     if( ele.getAttribute("id") === "equal" ){
    //         doc.select('.result').innerHTML = "";
    //         Calc(numberToCalc.join(""));
    //         doc.select('.operation p').innerHTML = "";
    //         numberToCalc = [];
    //     };

    //     });
    
    // });
  
    // // document.querySelector('.select p').appendChild
    // // Add Numbers To Calc Operation
    // function AddNumbers(num){
    //     // create Text Node And Push Number Into It
    //     let number = document.createTextNode(num);
    //     doc.select('.operation p').appendChild(number);
    // };
    
    // // Remove All Numbers
    // function RemoveAll(){ doc.select('.operation p').innerHTML = ""; doc.select('.result').innerHTML = "0" };
    
    // // Calc Numbers
    // function Calc(num){
    //     // create Text Node And Push Number Into It
    //     let number = document.createTextNode(eval(num));
    //     doc.select('.result').innerHTML = "";
    //     doc.select('.result').appendChild(number);
    // };
  

    return (
        <> 
            <div className="DashBoard-Content_Overview CalcDiv">
                
                <div class="DashBoard-Content_Overview_Container">
                    <div class="calc-controls">
                    <div class="calc-result">
                        <div class="operation"><p></p></div>
                        <div class="result">0</div>
                    </div>

                    <div class="controls">
                        <span data-operator="%">%</span>
                        <span>+/-</span>
                        <span id="clear">C</span>
                        <span data-operator="/">/</span>
                        <span data-operator="7">7</span>
                        <span data-operator="8">8</span>
                        <span data-operator="9">9</span>
                        <span data-operator="*">x</span>
                        <span data-operator="4">4</span>
                        <span data-operator="5">5</span>
                        <span data-operator="6">6</span>
                        <span data-operator="-">-</span>
                        <span data-operator="1">1</span>
                        <span data-operator="2">2</span>
                        <span data-operator="3">3</span>
                        <span data-operator="+">+</span>
                        <span data-operator="0">0</span>
                        <span data-operator=".">,</span>
                        <span id="equal">=</span>
                    </div>
                    </div>
                </div>

            </div>
        </>
    )

};



export default DashboardContentCalc;
