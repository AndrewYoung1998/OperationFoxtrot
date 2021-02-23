import React, {useRef, useState} from 'react';
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        //try/catch to check database for user and log them in.
        try {
            setError('');
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }

    return(
        <div>
            <header>
                <div className="button sign-up">
                   <Link to='/signup'>Sign Up</Link>
                </div>
            </header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Login</h1>
                </div>
                <p>{error}</p>
                <div className="form-body">
                    <input type="email" ref={emailRef} placeholder="Email"/>
                    <br/>
                    <input type="password" ref={passwordRef} placeholder="Password"/>
                    <br/>
                    <button type="submit" disabled={loading}>Login</button>
                    <div className="forgot-password">
                        <Link to='/forgot-password'>Forgot Password</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
