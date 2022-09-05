import React, { useState } from "react";
import s from './Navbar.module.css';
import {getPokemonsName} from '../actions'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function Navbar(){
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonsName(name))
        
    }

    return(
        <div className= {s.divNav}>
            <div className={s.pokedex}>
                <a href="http://localhost:3000/home"><p className={s.pPoke}>Pokédex</p></a>
            </div>

            <div className={s.divCreate}>
                <Link to='/CreatePokemon'>
                <button className={s.btnCreate}>+</button>
                </Link>
                <p className={s.lblCreate}>New Pokemon</p>
            </div>

            <div className={s.searchbtn}>
                <input placeholder="Search Pokemon.." type="search"  onChange={(e) => handleInput(e)}/>
                <button className={s.btnSearch}  type= 'submit'onClick={(e) => handleSubmit(e)}>​</button>
            </div>
        </div>
    )
}