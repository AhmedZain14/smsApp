import './login.css';
import logo from '../images/logo.png';
import { useEffect, useState, useRef, createContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Quotes from '../Quotes';
import Style from '../main.module.css';
// className={[activeClass, data.klass, "main-class"].join(' ')}

import { useSelector, useDispatch } from 'react-redux';
import { logInOut, fetchAccounts } from '../state/loginSlice';


function Login(){

    let loginMessage = useRef();
    let navigate = useNavigate ();
    const dispatch = useDispatch();
    const {loginMsg, account} = useSelector( (state) => state.login );

    let [userData, setUserData] = useState({
            username: '',
            password: ''
    });
    let [status, setStatus] = useState({
        value: null,
        msg: ''
    });
      
    let getData = (e) => {
        e.preventDefault();
        let {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        
    };

    let HandleSubmit = (e) => {
        e.preventDefault();
        let {username, password} = userData;

        dispatch(logInOut(userData));
        // console.log("Your data is: ", userData);
    };


    useEffect( () => {
        dispatch(fetchAccounts());
    }, [dispatch]); 

    useEffect( () => {
        
        
        if(account){

            if(!account.ban){
                if(account.role === "admin"){
                    navigate("/dashboard", {replace: true});
                }else{
                    navigate("/", {replace: true});
                }
            }

        }else{
            navigate("/login", {replace: true});
        }

    }, [account, navigate]); 

    useEffect( () => {
        document.body.style.backgroundColor = "#F4F5FC";
    }, []);                     

      
    return (
        <> 
            <div className="container navbar">
                <div className="container">
                <img src={logo} className="navbar-logo" alt="logo"/>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Quotes />
                    <div className="login-form">
                        <form action="" onSubmit={HandleSubmit}>
                            <div className="header">
                                <i className="fa-solid fa-user"></i>
                                {/* <img src="https://img.icons8.com/ios-glyphs/90/000000/user--v1.png" alt="user-logo" /> */}
                                <h2>welcome back...</h2>
                                <span>Please enter your username and code</span>
                            </div>
                            {/* <label htmlFor="username" className="form-label">Username</label> */}
                            <input onChange={getData} name="username" placeholder='username' type="text" id="username" className="form-control" aria-describedby="usernameHelpBlock"/>
                            {/* <label htmlFor="code" className="form-label">Code</label> */}
                            <input onChange={getData} name="password" placeholder='code' type="password" id="code" className="form-control" aria-describedby="codeHelpBlock"/>
                            <div id="codeHelpBlock" className="form-text">
                            <span ref={loginMessage} style={{"color": ((loginMsg?.value === "post" || loginMsg?.value === "pending") ? "#4e6eaf" : "red" ), "display": "block", "textAlign": "center", "marginBottom": "10px"}}>{loginMsg?.msg}</span>
                             Make sure you have obtained the correct code
                            from the administration.
                            </div>
                            <button className="login-btn" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}



export default Login;

