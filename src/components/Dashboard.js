import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";



export default function Dashboard(){
    const [therapist, setTherapist] = useState()
    useEffect(() => {
        fetch('http://localhost:3001/scrape')
            .then(res => res.json())
            .then(json => setTherapist(json)).catch(function (e) {
            console.warn(e);
        });
    },[]);
    return(
        <div>
            <header>
                <h1>List of Therapist</h1>
                <div className="button">
                    <Link to='/Profile'>View Profile</Link>
                </div>
            </header>
            <div id="data" className='container'>
                <ul>
                    {therapist?.map(allTherapist => {
                        return (
                            <li>
                                <img src={allTherapist.image}/>
                                {allTherapist.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
