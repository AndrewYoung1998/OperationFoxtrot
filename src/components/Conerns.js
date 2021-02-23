import React, {useRef, useState} from "react";
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import 'firebase/firestore';
import {db} from '../firebase'

export default function Concerns(){
    //Ref states
    const addictionRef = useRef();
    const alcoholRef = useRef();
    const angerRef = useRef();
    const antiSocialRef = useRef();
    const anxietyRef = useRef();
    const careerCounselRef = useRef();
    const chronicPainRed = useRef();
    const copingSkillsRef = useRef();
    const depression = useRef();
    const domesticAbuseRef = useRef();
    const domesticViolenceRef = useRef();
    const drugAbuseRef = useRef();
    const emotionalDisturbanceRef =useRef();
    const gamblingRef = useRef();
    const lifeTransitionRef = useRef();
    const selfEsteemRef = useRef();
    const stressRef = useRef();
    const suicidalIdeationRef = useRef();
    const traumaPTSDRef = useRef();
    const traumaticBrainInjuryRef = useRef();


    const {currentUser} = useAuth()

    async function handleSubmit(e){
        e.preventDefault();
        console.log(currentUser.uid)
    }

    return(
        <div>
            <label>Addiction</label>
            <input type="checkbox" ref={addictionRef}/>
            <br/>
            <label>Alcohol Use</label>
            <input type="checkbox" ref={alcoholRef}/>
            <br/>
            <label>Anger Management</label>
            <input type="checkbox" ref={angerRef}/>
            <br/>
            <label>AntiSocial Personality</label>
            <input type="checkbox" ref={antiSocialRef}/>
            <br/>
            <label>Anxiety</label>
            <input type="checkbox" ref={anxietyRef}/>
            <br/>
            <label>Career Counseling</label>
            <input type="checkbox" ref={careerCounselRef}/>
            <br/>
            <label>Chronic Pain</label>
            <input type="checkbox" ref={chronicPainRed}/>
            <br/>
            <label>Coping Skills</label>
            <input type="checkbox" ref={copingSkillsRef}/>
            <br/>
            <label>Depression</label>
            <input type="checkbox" ref={depression}/>
            <br/>
            <label>Domestic Abuse</label>
            <input type="checkbox" ref={domesticAbuseRef}/>
            <br/>
            <label>Domestic Violence</label>
            <input type="checkbox" ref={domesticViolenceRef}/>
            <br/>
            <label>Drug Abuse</label>
            <input type="checkbox" ref={drugAbuseRef}/>
            <br/>
            <label>Emotional Disturbance</label>
            <input type="checkbox" ref={emotionalDisturbanceRef}/>
            <br/>
            <label>Gambling</label>
            <input type="checkbox" ref={gamblingRef}/>
            <br/>
            <label>Life Transitions</label>
            <input type="checkbox" ref={lifeTransitionRef}/>
            <br/>
            <label>Self Esteem</label>
            <input type="checkbox" ref={selfEsteemRef}/>
            <br/>
            <label>Stress</label>
            <input type="checkbox" ref={stressRef}/>
            <br/>
            <label>Suicidal Ideation </label>
            <input type="checkbox" ref={suicidalIdeationRef}/>
            <br/>
            <label>Trauma & PTSD </label>
            <input type="checkbox" ref={traumaPTSDRef}/>
            <br/>
            <label>Traumatic Brain Injury</label>
            <input type="checkbox" ref={traumaticBrainInjuryRef}/>
            <br/>
            <button onClick={handleSubmit}>Push</button>
        </div>
    )
}
