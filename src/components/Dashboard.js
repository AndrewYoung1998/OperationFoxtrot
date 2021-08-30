import React, {useEffect, useState,} from 'react';
import {Link} from "react-router-dom";
import firebase from "../firebase";
import './css/style.css'

export default function Dashboard(){

    const [therapist, setTherapist] = useState();
    const [zipCode, setZipCode] = useState();
    let userID = firebase.auth().currentUser.uid
    firebase.firestore().collection('veterans').doc(userID).get()
        .then((doc)=>{
            setZipCode(doc.data().zip_code)
    })
    useEffect(() => {
        fetch('http://localhost:3001/scrape/'+zipCode)
            .then(res => res.json())
            .then(json => setTherapist(json)).catch(function (e) {
            console.warn(e);
        });
    },[zipCode]);
    return(
        <div>
            <header>
                <h1>List of Therapist</h1>
                <div className="button">
                    <Link to='/Profile'>View Profile</Link>
                </div>
            </header>
            <div id="data" className='container'>
                <div className={'therapist-list'}>
                   {therapist?.map((allTherapist) => {
                        return (
                            <div className={'therapist-card'}>
                                <div className={'therapist-name'}>
                                    <h3>{allTherapist.title}</h3>
                                </div>
                                <div className={'therapist-information'}>
                                    <div className={'therapist-image'}>
                                        <img src={allTherapist.image} alt={allTherapist.title}/>
                                    </div>
                                    <div className={'therapist-excerpt'}>
                                        {allTherapist.excerpt}
                                    </div>
                                    <div className={'therapist-phone'}>
                                        <a href={`tel:${allTherapist.phone}`}>{allTherapist.phone}</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
