import React from 'react';
import {Link} from "react-router-dom";


export default function Dashboard(){

    return(
        <div>
            <header>
                <h1>List of Therapist</h1>
                <div className="button">
                    <Link to='/Profile'>View Profile</Link>
                </div>
            </header>

        </div>
    )
}
