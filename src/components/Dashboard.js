import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function Dashboard(){
    const [error, setError] = useState();
    const { currentUser, logout } =useAuth();
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
    return(
        <div>
            <h1>Profile</h1>
            {error && alert({error})}
            <div className="email">
                Email: {currentUser.email}
                <br/>
                <Link to="/update-profile" className="profile-button">Update Profile</Link>
            </div>
            <div className="logout">
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}
