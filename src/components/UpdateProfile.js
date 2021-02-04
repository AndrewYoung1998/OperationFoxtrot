import React, {useRef, useState} from 'react';
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function UpdateProfile(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

     function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value ){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(()=>{
            setError('Failed to update account')
        }).finally(()=>{
            setLoading(false)
        })


    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Update Profile</h1>
                </div>
                <p>{error}</p>
                <div className="form-body">
                    <input type="email" ref={emailRef} placeholder="Email" defaultValue={currentUser.email}/>
                    <br/>
                    <input type="password" ref={passwordRef} placeholder="leave blank to keep the same"/>
                    <br/>
                    <input type="password" ref={confirmPasswordRef} placeholder="leave blank to keep the same"/>
                    <br/>
                    <button type="submit" disabled={loading}>Update</button>
                    <div className="cancel">
                       <Link to='/'>Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
