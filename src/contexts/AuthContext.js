import React, {useContext, useEffect, useState} from 'react';
import 'firebase/auth';
import {auth} from "../firebase";

const  AuthContext =  React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //Signs user up using firebase auth
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    //Logs in user using firebase auth
    function login (email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    //Logs out user using firebase auth
    function logout(){
        return auth.signOut();
    }
    //Resets users password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    //Allows user to update email
    function updateEmail(email){
        return auth.currentUser.updateEmail(email)
    }
    //Allows user to update password
    function updatePassword(password){
        return auth.currentUser.updatePassword(password)
    }
    useEffect(() =>{
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
