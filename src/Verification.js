import Axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';

function Verification(){

    const [ Captcha , setCaptcha ] = useState("");
    const [ OTP , setOTP ] = useState("");
    const [ Loader , setLoader ] = useState(false);

    const  Navigate = useNavigate();
    const Location = useLocation();

    useEffect(
        ()=>{
            Axios.post("https://angry-bee-glasses.cyclic.app/userMailer" , {
                name : Location.state.name,
                otp : Location.state.otp,
                mail : Location.state.email,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []
    );

    const Upload = () => {
        setLoader(true);
        Axios.put("https://angry-bee-glasses.cyclic.app/addUser" , 
            {
                name : Location.state.name,
                email : Location.state.email,
                mobile : Location.state.mobile,
                gender : Location.state.gender,
                dob : Location.state.dob,
                age : Location.state.age,
                password : Location.state.password,
            }).then(()=>{
                setLoader(false);
                Navigate('/Login');
            });
    };

    const check = () => {
        if(Captcha.toString() === Location.state.captcha.toString()){
            if(OTP.toString() === Location.state.otp.toString()){
                Upload();
            }
            else{
                alert("OTP Miss Match");
            }
        }
        else{
            alert("Captcha Miss Match");
        }
    };

    return(
        <>{
            (Loader)?
            <div className='loader-main'>
                <div className="loader"></div>
                <p className='loader-text'>Adding You In...</p>
            </div>
            :
            <div className="overall-log">
                <p className="header">Magic Corner</p>
                <div className="main-container">
                    <div className="container">
                        <button className="float-start general-button disabled-button" disabled>
                            VERIFICATION
                            <i className="fi fi-ss-user end-icons" ></i>
                        </button>
                        <div className="container sub-container-1 float-start">
                            <form>
                                <p className="label-log-attributes">
                                    CAPTCHA: <s>{Location.state.captcha}</s>
                                </p>
                                <br></br>
                                <input type="text" placeholder="CAPTCHA" 
                                    className="input-log-attributes w-100"
                                    onChange={(event)=>{setCaptcha(event.target.value)}}>
                                </input>
                                <br></br>
                                <p className="label-log-attributes">
                                    OTP:
                                </p>
                                <br></br>
                                <input type="text" placeholder="OTP" 
                                    className="input-log-attributes w-100"
                                    onChange={(event)=>{setOTP(event.target.value)}}>
                                </input>
                                <button className="final-button general-button"
                                    onClick={check} type="button">
                                    <p className="final-label">
                                    VERIFY
                                    <i className="fi fi-br-angle-right end-icons-err"></i>
                                    </p>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="clear"></div>
            </div>
            }
        </>
    );
}

export default Verification;