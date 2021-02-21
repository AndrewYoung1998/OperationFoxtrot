import React, {useRef, useState} from 'react';
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import 'firebase/firestore';
import {db} from '../firebase'

export default function SignUp(){
    const nameRef = useRef();
    const emailRef = useRef();
    const yearsEnlistedRef = useRef();
    const rankRef = useRef();
    const zipCodeRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        //Checks that passwords match
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        //Try/Catch to make sure account creation is successful
        try {
            setError('');
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
                .then(cred =>{
                    return db.collection('veterans').doc(cred.user.uid).set({
                        name:nameRef.current.value,
                        //email:emailRef.current.value,
                        year_enlisted:yearsEnlistedRef.current.value,
                        military_rank:rankRef.current.value,
                        zip_code:zipCodeRef.current.value
                })
            }).then(() =>{
                history.push('/');
            });
        } catch {
            setError('Failed to create account')
            alert(error)
        }
        setLoading(false)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Veteran Information</h1>
                </div>
                <div className="form-body">
                    <input type="text" ref={nameRef} placeholder="Full Name"/>
                    <br/>
                    <input type="email" ref={emailRef} placeholder="Email"/>
                    <br/>
                    <input type="number" ref={yearsEnlistedRef} placeholder="Years Enlisted"/>
                    <br/>
                    <input type="text" ref={rankRef} placeholder="Military Rank"/>
                    <br/>
                    <input type="number" ref={zipCodeRef} placeholder="Zip Code"/>
                    <br/>
                    <input type="password" ref={passwordRef} placeholder="Password"/>
                    <br/>
                    <input type="password" ref={confirmPasswordRef} placeholder="Password"/>
                    <br/>
                    <button type="submit" disabled={loading}>Create Account</button>
                    <div className="login">
                        Have an account? <Link to='/login'>Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
