import React, {useEffect, useState,} from 'react';
import {Link} from "react-router-dom";
import firebase from "../firebase";

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
                <div>
                   {therapist?.map((allTherapist) => {
                        return (
                            <div>
                                <div>
                                <img src={allTherapist.image} alt={allTherapist.title}/>
                                </div>
                                <br/>
                                <div>
                                    {allTherapist.title}
                                </div>
                                <br/>
                                <div>
                                    {allTherapist.excerpt}
                                </div>
                                <br/>
                                <div>
                                    {allTherapist.phone}
                                </div>
                                <br/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
