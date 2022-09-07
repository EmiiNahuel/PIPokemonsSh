import React from "react";
import s from './Card.module.css'
import { Link } from "react-router-dom";

export default function Card({name, img, attack, types, id}){
    return (
        <Link to={'/detailsPokemon/' + id}>
        <div className={s.divCard}>
            <h3 className={s.titlePok}>{name}</h3>
            <img src={img? img : 'https://img1.freepng.es/20171220/xxq/question-mark-png-5a3a530b302187.6463118015137717871972.jpg'} alt="Img Pokemon" width='200px' height='180px' />
            <h5 className={s.attack} >Attack: {attack}</h5>
            <h5 className={s.types} >Type: {types.map(e => {return e.name + '. '})}</h5>
        </div>
        </Link>
    )
}