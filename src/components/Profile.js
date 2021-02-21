import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import 'firebase/firestore';
import {db} from '../firebase'

export default function Profile() {
    const [error, setError] = useState();
    const [veterans, setVeterans] = useState();
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to Logout')
        }
    }

    useEffect(() => {
        db.collection("veterans").doc(currentUser.uid).get().then(doc =>{
            setVeterans(doc.data())
        });
    },[currentUser.uid]);

    return (
        <div className="profile">
            <header>
                <h1>Profile</h1>
                <div className="button therapist-button">
                    <Link to='/'>List of Therapist</Link>
                </div>
            </header>
            {error && alert({error})}

            <div className="information">
                Name: {veterans?.name}
                <br/>
                <br/>
                Email: {currentUser.email}
                <br/>
                <br/>
                Military Rank:{veterans?.military_rank}
                <br/>
                <div className="info-footer">
                    <Link to="/update-profile" className="button">Update Profile</Link>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}
