import React, {useState} from "react";
import './css/forms.css';
import './css/style.css'
import {useAuth} from "../contexts/AuthContext";
import { useHistory} from "react-router-dom";
import 'firebase/firestore';
import {db} from '../firebase'

export default function Concerns(){
    const [concerns, setConcerns] = useState({
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
            suicidal_ideation:false,
            trauma_ptsd:false,
            traumatic_brain_injury:false
    })

    const history = useHistory();
    const {currentUser} = useAuth();

    function handleCheckbox(e) {
        let newConcerns = { ...concerns };
        newConcerns[e.target.name] = !newConcerns[e.target.name];
        setConcerns(newConcerns);
    }

    function handleSubmit(e){
        e.preventDefault();
        db.collection('veterans').doc(currentUser.uid).set({
            concerns:[
                {
                    concern:concerns.addiction,
                    name_concern:"addiction"
                },
                {
                    concern:concerns.alcohol,
                    name_concern: "alcohol"
                },
                {
                    concern:concerns.anger_management,
                    name_concern:"anger management"
                },
                {
                    concern:concerns.anti_social,
                    name_concern:"anti-social"
                },
                {
                    concern:concerns.anxiety,
                    name_concern:"anxiety"
                },
                {
                    concern:concerns.career_counseling,
                    name_concern:"career counseling"
                },
                {
                    concern:concerns.chronic_pain,
                    name_concern:"chronic pain"
                },
                {
                    concern:concerns.coping_skills,
                    name_concern:"coping skills"
                },
                {
                    concern:concerns.depression,
                    name_concern:"depression"
                },
                {
                    concern:concerns.domestic_abuse,
                    name_concern:"domestic abuse"
                },
                {
                    concern:concerns.domestic_violence,
                    name_concern:"domestic violence"
                },
                {
                    concern:concerns.drug_abuse,
                    name_concern:"drug abuse"
                },
                {
                    concern:concerns.emotional_disturbance,
                    name_concern:"emotional disturbance"
                },
                {
                    concern:concerns.gambling,
                    name_concern:"gambling"
                },
                {
                    concern:concerns.life_transition,
                    name_concern:"life transition"
                },
                {
                    concern:concerns.self_esteem,
                    name_concern:"self-esteem"
                },
                {
                    concern:concerns.stress,
                    name_concern:"stress"
                },
                {
                    concern:concerns.suicidal_ideation,
                    name_concern:"suicidal"
                },
                {
                    concern:concerns.trauma_ptsd,
                    name_concern:"trauma/ptsd"
                },
                {
                    concern:concerns.traumatic_brain_injury,
                    name_concern:"brain injury"
                }
            ]
        },{merge:true}).then(() => {
            history.push('/profile');
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    return(
        <div className={"concerns"}>
            <div className={"row"}>
                <label>Addiction</label>
                <input type="checkbox" name="addiction"  value={ concerns.addiction } onChange={ handleCheckbox }/>
                <br/>
                <label>Alcohol Use</label>
                <input type="checkbox" name="alcohol"  value={ concerns.alcohol } onChange={ handleCheckbox }/>
                <br/>
                <label>Anger Management</label>
                <input type="checkbox" name="anger_management"  value={ concerns.anger_management } onChange={ handleCheckbox }/>
                <br/>
                <label>AntiSocial Personality</label>
                <input type="checkbox" name="anti_social"  value={ concerns.anti_social } onChange={ handleCheckbox }/>
                <br/>
                <label>Anxiety</label>
                <input type="checkbox" name="anxiety"  value={ concerns.anxiety } onChange={ handleCheckbox }/>
                <br/>
                <label>Career Counseling</label>
                <input type="checkbox"name="career_counseling" value={ concerns.career_counseling } onChange={ handleCheckbox }/>
                <br/>
                <label>Chronic Pain</label>
                <input type="checkbox" name="chronic_pain"  value={ concerns.chronic_pain } onChange={ handleCheckbox }/>
                <br/>
                <label>Coping Skills</label>
                <input type="checkbox" name="coping_skills"  value={ concerns.coping_skills } onChange={ handleCheckbox }/>
                <br/>
                <label>Depression</label>
                <input type="checkbox" name="depression"  value={ concerns.depression } onChange={ handleCheckbox }/>
                <br/>
                <label>Domestic Abuse</label>
                <input type="checkbox" name="domestic_abuse"  value={ concerns.domestic_abuse } onChange={ handleCheckbox }/>
                <br/>
            </div>

            <div className={"row"}>
                <label>Domestic Violence</label>
                <input type="checkbox" name="domestic_violence"  value={ concerns.domestic_violence } onChange={ handleCheckbox }/>
                <br/>
                <label>Drug Abuse</label>
                <input type="checkbox" name="drug_abuse"  value={ concerns.drug_abuse } onChange={ handleCheckbox }/>
                <br/>
                <label>Emotional Disturbance</label>
                <input type="checkbox" name="emotional_disturbance"  value={ concerns.emotional_disturbance } onChange={ handleCheckbox }/>
                <br/>
                <label>Gambling</label>
                <input type="checkbox" name="gambling"  value={ concerns.gambling } onChange={ handleCheckbox }/>
                <br/>
                <label>Life Transitions</label>
                <input type="checkbox" name="life_transition"  value={ concerns.life_transition } onChange={ handleCheckbox }/>
                <br/>
                <label>Self Esteem</label>
                <input type="checkbox" name="self_esteem"  value={ concerns.self_esteem } onChange={ handleCheckbox }/>
                <br/>
                <label>Stress</label>
                <input type="checkbox" name="stress"  value={ concerns.stress } onChange={ handleCheckbox }/>
                <br/>
                <label>Suicidal Ideation </label>
                <input type="checkbox" name="suicidal_ideation"  value={ concerns.suicidal_ideation } onChange={ handleCheckbox }/>
                <br/>
                <label>Trauma & PTSD </label>
                <input type="checkbox" name="trauma_ptsd"  value={ concerns.trauma_ptsd } onChange={ handleCheckbox }/>
                <br/>
                <label>Traumatic Brain Injury</label>
                <input type="checkbox" name="traumatic_brain_injury"  value={ concerns.traumatic_brain_injury } onChange={ handleCheckbox }/>
                <br/>
            </div>
            <button onClick={handleSubmit}>Create Account</button>
        </div>
    )
}
