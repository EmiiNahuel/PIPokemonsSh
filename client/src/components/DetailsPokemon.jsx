import React from "react";
import { clearDetails, getDetails } from "../actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import s from './DetailsPokemon.module.css'

export default function DetailsPokemon(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    function backSubmit(e){
        e.preventDefault()
        history.push('/home')
        
    }

    useEffect(() => {
        dispatch(getDetails(id))
        return () => {
            dispatch(clearDetails())           
        }
    },[dispatch, id])

    const myDetails = useSelector((state) => state.details)

    return(
        <div className={s.cardDetail}>
           {
               myDetails.length?
               <div className={s.divDetails}>
                   <h3>{myDetails[0].name.toUpperCase()}</h3>
                   <img src={myDetails[0].img ? myDetails[0].img : 'https://img1.freepng.es/20171220/xxq/question-mark-png-5a3a530b302187.6463118015137717871972.jpg'} alt="" width='200px' height='200px'/>
                   <div>
                   <p>ID: {myDetails[0].id}</p>
                   </div>
                   <div>
                   <p>HP: {myDetails[0].hp}</p>
                   </div>
                   <div>
                   <p>ATTACK: {myDetails[0].attack}</p>
                   </div>
                   <div>
                   <p>DEFENSE: {myDetails[0].defense}</p>
                   </div>
                   <div>
                   <p>SPEED: {myDetails[0].speed}</p>
                   </div>
                   <div>
                   <p>HEIGHT: {myDetails[0].height}</p>
                   </div>
                   <div>
                   <p>WEIGHT: {myDetails[0].weight}</p>
                   </div>
                   <div>
                   <p>TYPES: {myDetails[0].types.map(t => t.name.toUpperCase() + '. ')}</p>
                   </div>
                   

                   <button onClick={backSubmit} className={s.btnBack}>Back Home</button>
                   

                </div>:
                <img className={s.imgLoading} src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif" alt=""  />
           } 
        </div>
    )
}