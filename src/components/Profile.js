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

    //Logout function
    async function handleLogout() {
        setError('');
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to Logout')
        }
    }

    //Gets current user document data
    useEffect(()  => {
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
                <div className="profile-header">
                    <h3>About yourself</h3>
                </div>
                Name: {veterans?.name}
                <br/>
                <br/>
                Email: {currentUser.email}
                <br/>
                <br/>
                Years Enlisted: {veterans?.year_enlisted}
                <br/>
                <br/>
                Military Rank: {veterans?.military_rank}
                <br/>
                <br/>
                Zipcode: {veterans?.zip_code}
                <br/>
                <br/>
                Data Sharing:{ veterans?.opt_in ? 'Yes' : 'No' }
                <br/>
                <div className="info-footer">
                    <div className={'cancel'}>
                        <Link to="/update-profile">Update Profile</Link>
                    </div>
                    <br/>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>

            <div className="information-concerns">
                {/*displays all concerns that return true*/}
                <div className="concerns-header">
                    <h3>Concerns</h3>
                </div>
                <ul>
                    {veterans?.concerns.map(allConcern => {
                        if(allConcern.concern === true){
                            return (
                                <li key={allConcern.name_concern}>{allConcern.name_concern}</li>
                            )}else{
                            return ''
                        }
                    })}
                </ul>
            </div>
        </div>

    )
}
