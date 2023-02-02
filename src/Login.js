import { useState , useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import Axios from 'axios';

import './Login.css';

function Login(){
    const [ Username , setUsername ] = useState (null );
    const [ Password , setPassword ] = useState( [] );
    const [ Loading , setLoading ] = useState(false);
    const Navigate = useNavigate();

    useEffect(
        () =>{
            setLoading(true);
            Axios.get("https://angry-bee-glasses.cyclic.app/allUsers").then((response) => {
                setUsers_list(response.data);
                setLoading(false);
            });
        } , []
    );
    const [ Users_list , setUsers_list ] = useState([]);

    const validate = () => {
        setLoading(true);
        if(Users_list.length === 0){
            setLoading(false)
            alert("Invalid Username!!");
        }
        else{
            for(var j = 0 ; j <= Users_list.length ; j++){
                if( Users_list[j].email.toString() === Username.toString() ){
                    if( Users_list[j].password.toString() === Password.toString() ){
                        setLoading(false)
                        Navigate('/' , {state:{id:Users_list[j]._id , user:Username , name:Users_list[j].full_name , status:"LoggedIn" , type : "user" }});
                        break;
                    }
                    else{setLoading(false);alert("Invalid Password")}
                }
                else if( j === Users_list.length-1 ){setLoading(false);alert("Invalid Username!!");}
            }
        }
    };
        
    const check = () => {
        validate();

    };

    return(
        <>
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div>
                </div>
                :
                <div className="overall-log">
                    <p className="header">Upload</p>
                    <div className="main-container">
                        <div className="container">
                            <button className="float-start general-button disabled-button" disabled>
                                LOGIN
                                <i className="fi fi-ss-user end-icons" ></i>
                            </button>
                            <button className="float-end general-button active-button" 
                                onClick={()=>{Navigate("/Register");}}>
                                REGISTER
                                <i className="fi fi-ss-user-add end-icons"></i>
                            </button>
                            <div className="container sub-container-1 float-start">
                                <form>
                                    <p className="label-log-attributes">
                                        USERNAME:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="Email......" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setUsername(event.target.value)}}>
                                    </input>
                                    <br></br>
                                    <p className="label-log-attributes">
                                        PASSWORD:
                                    </p>
                                    <br></br>
                                    <input type="password" placeholder="Password......" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setPassword(event.target.value)}}>
                                    </input>
                                    <button className="final-button general-button"
                                        onClick={check} type="button">
                                        <p className="final-label">
                                        GET IN
                                        <i className="fi fi-br-angle-right end-icons-err"></i>
                                        </p>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <Link to="/ForgotPassword" className='forgot-password'>Forgot Password ?</Link>
                    </div>
                    <div className="clear"></div>
                </div>
            }
        </>
    );
}

export default Login;