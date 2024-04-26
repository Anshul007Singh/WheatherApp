import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../helper/AuthContext';
import Button from './Button';
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const authContext = useContext(AuthContext);
    const loginData = {
        mail: 'user@example.com',
        pass: 'password12'
    }

    const updateButtonStyle = () => {
        console.log(email === loginData.mail)
        if( email === loginData.mail && password ===  loginData.pass){
            setIsValid(true);
            // console.log('valid')
        } else {
            setIsValid(false);
            // console.log('ivalied')
        }
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        setPassword('');
        setEmail('');
        setIsValid(false);
        console.log('submit')
        authContext.onLogin();
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        updateButtonStyle();
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        updateButtonStyle();
    }
    let buttonStyle = !isValid ? { background: 'grey' } : { background: 'green' };
 

    return (
        <div className="container mt-5" >
        <div className="row p-4">
        <div className="col-md-6 " style={{backgroundColor:'beige'}}>
                <h1 >Welcome</h1><br />
                <h4>Please Login to Continue....</h4>
            </div>
            <div className="col-md-3 p-4" style={{backgroundColor:'#DAEACE'}}>
                <form>
                    <div className="mb-3">
                        <label className="form-label float-start fw-bold">Email address</label>
                        <input type="email" value={email} onChange={emailHandler} className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label float-start fw-bold">Password</label>
                        <input type="password" value={password} onChange={passwordHandler} className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <Button className={'btn btn-primary'} text={'Submit'} onClick={submitHandler} disabled= {!isValid} style={buttonStyle} />
                </form>
            </div>
            
        </div>   
        {/* <div>
            <h1>Counter- { counter}</h1>
            <button onClick={()=> dispatch({type:'increment'})} className="btn btn-success">Increment</button>
            <button onClick={()=> dispatch({type:'decrement'})} className="btn btn-danger">Decrement</button>
            <button onClick={()=> dispatch({type: 'reset'})} className="btn btn-secondary">Reset</button>
        </div> */}
    </div>
  
  );
}

export default Login;