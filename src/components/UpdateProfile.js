import React, {useEffect, useRef, useState} from 'react';
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import {db} from "../firebase";
import ReactTooltip from "react-tooltip";

export default function UpdateProfile(){
    const nameRef = useRef();
    const emailRef = useRef();
    const yearsEnlistedRef = useRef();
    const militaryRankRef = useRef();
    const zipCodeRef = useRef();
    const checkedRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const { currentUser, updateEmail, updatePassword } = useAuth();

    const [error, setError] = useState('');
    const [veterans, setVeterans] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        db.collection("veterans").doc(currentUser.uid).get().then(doc =>{
            setVeterans(doc.data())
        });
    },[currentUser.uid]);

     async function handleSubmit(e) {
         e.preventDefault()

         if (passwordRef.current.value !== confirmPasswordRef.current.value) {
             return setError('Passwords do not match')
         }
         const promises = []
         setLoading(true)
         setError("")

         if (emailRef.current.value !== currentUser.email) {
             promises.push(updateEmail(emailRef.current.value))
         }
         if (passwordRef.current.value) {
             promises.push(updatePassword(passwordRef.current.value))
         }

         if (nameRef.current.value !== veterans?.name) {
             await db.collection("veterans").doc(currentUser.uid).set({
                 name: nameRef.current.value
             }, {merge: true})
         }
         if (yearsEnlistedRef.current.value !== veterans?.year_enlisted) {
             await db.collection("veterans").doc(currentUser.uid).set({
                 year_enlisted: yearsEnlistedRef.current.value
             }, {merge: true})
         }
         if (militaryRankRef.current.value !== veterans?.military_rank) {
             await db.collection("veterans").doc(currentUser.uid).set({
                 military_rank: militaryRankRef.current.value
             }, {merge: true})
         }
         if (zipCodeRef.current.value !== veterans?.zip_code) {
             await db.collection("veterans").doc(currentUser.uid).set({
                 zip_code: zipCodeRef.current.value
             }, {merge: true})
         }
         if (zipCodeRef.current.value !== veterans?.zip_code) {
             await db.collection("veterans").doc(currentUser.uid).set({
                 zip_code: zipCodeRef.current.value
             }, {merge: true})
         }
         if (checkedRef.current.checked !== veterans?.opt_in) {
             await db.collection("veterans").doc(currentUser.uid).set({
                 opt_in: checkedRef.current.checked
             }, {merge: true})
         }
         Promise.all(promises).then(() => {
             history.push('/Profile')
         }).catch((error) => {
             setError(error.code)
         }).finally(() => {
             setLoading(false)
         })
     }

    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Update Profile</h1>
                </div>
                <p>{error}</p>
                <div className="form-body">
                    <input type="text" ref={nameRef} placeholder="Name" defaultValue={veterans?.name}/>
                    <br/>
                    <input type="email" ref={emailRef} placeholder="Email" defaultValue={currentUser.email}/>
                    <br/>
                    <input type="number" ref={yearsEnlistedRef} placeholder="Years Enlisted" defaultValue={veterans?.year_enlisted}/>
                    <br/>
                    <input type="text" ref={militaryRankRef} placeholder="Military Rank" defaultValue={veterans?.military_rank}/>
                    <br/>
                    <input type="number" ref={zipCodeRef} placeholder="Zip Code" defaultValue={veterans?.zip_code}/>
                    <br/>
                    <input type="password" ref={passwordRef} autoComplete={"new-password"} placeholder="leave blank to keep the same"/>
                    <br/>
                    <input type="password" ref={confirmPasswordRef} autoComplete={"new-password"} placeholder="leave blank to keep the same"/>
                    <br/>
                    <div className="share-data">
                        <label>Share Data</label>
                        <input type="checkbox" ref={checkedRef} defaultChecked={`veterans`?.opt_in}/>
                        <p data-for="main" data-tip>?</p>
                    </div>
                    <ReactTooltip
                        id="main"
                        place="right"
                        effect={"solid"}
                        multiline={true}
                    >"By checking this box you are opting in to sharing your data with us and other on the platform. You will be displayed on the Veterans Helping Veterans Page"</ReactTooltip>
                    <br/>
                    <button className={"update"} type="submit" disabled={loading}>Update</button>
                    <div className="cancel">
                       <Link to='/Profile'>Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
