import React, {useRef, useState} from 'react';
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import 'firebase/firestore';
import {db} from '../firebase';
import ReactTooltip from "react-tooltip";


export default function SignUp(){
    const nameRef = useRef();
    const emailRef = useRef();
    const yearsEnlistedRef = useRef();
    const rankRef = useRef();
    const zipCodeRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const checkedRef = useRef()

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
        if(nameRef.current.value === ''){
            alert('Your Name Field is Empty')
        }
        if(yearsEnlistedRef.current.value === ''){
            alert('Your Years Enlisted Field is Empty')
        }
        if(emailRef.current.value === ''){
            alert('Your Email Field is Empty')
        }
        if(rankRef.current.value === ''){
            alert('Your Rank Field is Empty')
        }
        if(zipCodeRef.current.value === ''){
            alert('Your Zip Code Field is Empty')
        }
        if(passwordRef.current.value.length < 8){
            alert('Password is not long enough')
        }
        //Try/Catch to make sure account creation is successful
        try {
            setError('');
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
                .then(cred =>{
                    return db.collection('veterans').doc(cred.user.uid).set({
                        name:nameRef.current.value,
                        year_enlisted:yearsEnlistedRef.current.value,
                        military_rank:rankRef.current.value,
                        zip_code:zipCodeRef.current.value,
                        opt_in:checkedRef.current.checked,
                        concerns:{
                            addiction:false,
                            alcohol:false,
                            anger_management:false,
                            anti_social:false,
                            anxiety:false,
                            career_counseling:false,
                            chronic_pain:false,
                            coping_skills:false,
                            depression:false,
                            domestic_abuse:false,
                            domestic_violence:false,
                            drug_abuse:false,
                            emotional_disturbance:false,
                            gambling:false,
                            life_transition:false,
                            self_esteem:false,
                            stress:false,
                            suicidal:false,
                            trauma_ptsd:false,
                            brain_injury:false
                        }
                })
            }).then(() =>{
                history.push('/concerns');
            });
        } catch {
            setError('Failed to create account')
            alert(error)
        }
        setLoading(false)
    }

    return(
        <div>
            <header>
                <div className="button therapist-button">
                    <Link to='/login'>Login</Link>
                </div>
            </header>
            <form className={"form"} onSubmit={handleSubmit}>
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
                    <div className="share-data">
                        <label>Share Data</label>
                        <input type="checkbox" ref={checkedRef}/>
                        <p data-for="main" data-tip>?</p>
                    </div>
                    <ReactTooltip
                        id="main"
                        place="right"
                        effect={"solid"}
                        multiline={true}
                    >"By checking this box you are opting in to sharing your data with us and other on the platform. You will be displayed on the Veterans Helping Veterans Page"</ReactTooltip>
                    <button type="submit" disabled={loading}>Next</button>
                </div>
            </form>

        </div>
    );
}
