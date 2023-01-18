import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css';

function Register()
{

    const Navigate = useNavigate();

    let Captcha=0
    let OTP = 0

    const generator = () =>{
        Captcha = Math.floor((Math.random()*9999)+1000);
        OTP = Math.floor((Math.random()*9999)+1000);

        console.log(Captcha,OTP);
    }

    const [ Loader , setLoader ] = useState(null);
    const [ Name , setName ] = useState(null);
    const [ Email , setEmail ] = useState(null);
    const [ Mobile , setMobile ] = useState(0);
    const [ Gender , setGender ] = useState(null);
    const [ Age , setAge ] = useState(0);
    const [ DOB , setDOB ] = useState(null);
    const [ Password , setPassword ] = useState(null); 
    const [ ExistingUsers , setExistingUsers ] = useState([]);
    
    useEffect(
        () =>{
            setLoader(true);
            Axios.get("http://localhost:3001/allUsers").then(
                (response) => {
                    setExistingUsers(response.data);
                    setLoader(false);
                }
            );
        } , []
    );

    const Decide = ()=>{

        if(ExistingUsers.length === 0){
            generator();
            Navigate('/Verification' , 
                {   
                    state:{name:Name , email:Email , mobile:Mobile , 
                    gender:Gender , age:Age , dob:DOB , password:Password ,
                    captcha:Captcha , otp:OTP}
                }
            );
        }
        else{
            for(var i=0 ; i<ExistingUsers.length ; i++){
                if(Email.toString() === ExistingUsers[i].email.toString()){
                    alert("User Exist");
                    Navigate('/Login');
                    break;
                }
                else{
                    if( i === ExistingUsers.length - 1){
                        generator();
                        Navigate('/Verification' ,
                            {   
                                state:{name:Name , email:Email , mobile:Mobile , 
                                gender:Gender , age:Age , dob:DOB , password:Password ,
                                captcha:Captcha , otp:OTP}
                            } 
                        );
                    }
                }
            }
        }
    }
    return(
        <>{
            (Loader)?<div class="loader"></div>
            :
            <div className='overall-log'>
                <p className="header">Upload</p>
                <div className=" main-container">
                    <div className="container">
                        <button className="float-start general-button active-button" 
                            onClick={()=>{Navigate("/Login");}}>
                            LOGIN
                            <i className="fi fi-ss-user end-icons" ></i>
                        </button>
                        <button className="float-end general-button disabled-button" disabled>
                            REGISTER
                            <i className="fi fi-ss-user-add end-icons"></i>
                        </button>
                        <div className="container sub-container-1 float-start">
                            <div className="container row p-0">
                                <div className="col-12 float-start">
                                    <p className="label-attributes">
                                        FULL NAME:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="Eg: Walter White" 
                                        className="input-attributes w-100"
                                        onChange={(event)=>{setName(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-4">
                                    <p className="label-attributes">
                                        GENDER:
                                    </p>
                                    <br></br>
                                    <select className="input-attributes w-100" onChange={(event)=>{setGender(event.target.value)}} required>
                                        <option className="option-attributes">SELECT</option>
                                        <option className="option-attributes">MALE</option>
                                        <option className="option-attributes">FEMALE</option>
                                        <option className="option-attributes">OTHERS</option>
                                        <option className="option-attributes">NOT PREFER TO TELL</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <p className="label-attributes">
                                        AGE:
                                    </p>
                                    <br></br>
                                    <input type="number" min="3" max="100" defaultValue="3" className="input-attributes w-100" 
                                        onChange={(event)=>{setAge(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-4">
                                    <p className="label-attributes">
                                        DOB:
                                    </p>
                                    <br></br>
                                    <input type="date" className="input-attributes w-100" onChange={(event)=>{setDOB(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-6 float-start">
                                    <p className="label-attributes">
                                        E-MAIL:
                                    </p>
                                    <br></br>
                                    <input type="email" className="input-attributes w-100" placeholder="Eg: Walterwhite1965@gmail.com" 
                                        onChange={(event)=>{setEmail(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-6 float-end">
                                    <p className="label-attributes">
                                        MOBILE NO:
                                    </p>
                                    <br></br>
                                    <input type="tel" pattern="[0-9]{10}" placeholder="Eg: 9582xxxxxx" 
                                        className="input-attributes w-100"
                                        onChange={(event)=>{setMobile(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-12">
                                    <p className="label-attributes">
                                        PASSWORD:
                                    </p>
                                    <br></br>
                                    <input type="password" placeholder="Eg: P@ssw0rd" 
                                        className="input-attributes w-100"
                                        onChange={(event)=>{setPassword(event.target.value)}} required>
                                    </input>
                                </div>
                            </div>
                            <button className="final-button general-button" onClick={Decide}>
                                <p className="final-label">
                                    REGISTER
                                    <i className="fi fi-br-angle-right end-icons-err"></i>
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="clear"></div>
            </div>
            }
        </>
    );
};

export default Register;
