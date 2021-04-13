import React, {useEffect, useState} from "react";
import './css/forms.css';
import './css/style.css'
import {useAuth} from "../contexts/AuthContext";
import { useHistory} from "react-router-dom";
import 'firebase/firestore';
import {db} from '../firebase'
import {Link} from "react-router-dom";

export default function UpdateConcerns(){
    const [updatedConcerns, setUpdatedConcerns] = useState()
    const [checkedVetConcerns, setCheckedVetConcerns] = useState()


    const history = useHistory();
    const {currentUser} = useAuth();

/*    function handleCheckbox(e) {
        let newConcerns = { ...updatedVetConcerns };
        newConcerns[e.target.checked] = !newConcerns[e.target.checked];
        setUpdatedVetConcerns(newConcerns);
    }*/

    useEffect(() => {
        db.collection("veterans").doc(currentUser.uid).get().then(doc =>{
            setUpdatedConcerns(doc.data())
       /*     console.log(updatedConcerns.concerns)*/
        });
    },[]);

    function handleConcernsSubmit(e){
        e.preventDefault();
        alert(checkedVetConcerns)

/*        db.collection('veterans').doc(currentUser.uid).set({
            concerns:[]
        },{merge:true}).then(() => {
            history.push('/profile');
        }).catch((error)=>{
            console.log(error.message)
        })*/
    }

    return(
        <div className={"concerns"}>
            <div className={"row"}>
                <div>
                {updatedConcerns?.concerns.map(allConcern => {
                    return (
                        <div>
                            <label>{allConcern?.name_concern}</label>
                            <input type="checkbox"
                                   name={ allConcern?.name_concern}
                                   value={ allConcern?.concern}
                                   defaultChecked={allConcern?.concern}
                                   onChange={()=>setCheckedVetConcerns(!allConcern?.concern)}
                            />
                        </div>
                    )
                })}
                </div>
            </div>
            <button onClick={handleConcernsSubmit}>Update Concerns</button>
            <div className="cancel">
                <Link to='/Profile'>Cancel</Link>
            </div>
        </div>
    )
}
