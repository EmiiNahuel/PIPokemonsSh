import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, pokemonFilterByOrigin, pokemonFilterByType, orderByAttackName} from "../actions";
import Footer from "./Footer";
import Card from "./Card";
import Paginado from "./Paginado";
import s from './Home.module.css'


export default function Home(){

    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.types);

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const [,setOrder] = useState('');
    const lastPokemon = currentPage * pokemonsPerPage; // 12
    const firstPokemon = lastPokemon - pokemonsPerPage; // 0
    const currentPokemons = allPokemons.slice(firstPokemon,lastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleOrderByAttackName(e){
        e.preventDefault()
        dispatch(orderByAttackName(e.target.value),
        setOrder(`${e.target.value}`))

    }

    function handleFilterByType(e){
        e.preventDefault()
        dispatch(pokemonFilterByType(e.target.value))
        setCurrentPage(1)
        
        
    }

    function handleByFilterOrigin(e) {
        e.preventDefault()
        dispatch(pokemonFilterByOrigin(e.target.value))
        setCurrentPage(1)
    } 


    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch]);

   



    return(
        <div className={s.divPrincipal}>
            <div>
             <label className={s.lord}>ORDER BY:</label>
             <select  onChange={(e) => handleOrderByAttackName(e)} className={s.ord}>
                 <option value="vacio"></option>
                 <optgroup label="Name">
                     <option value="az">A-Z</option>
                     <option value="za">Z-A</option>
                 </optgroup>
                 <optgroup label="Attack">
                     <option value="asc">ASC</option>
                     <option value="desc">DESC</option>
                 </optgroup>
             </select>
            </div>

            <div className={s.divFilters}>
                <div>
             <label>FILTER BY TYPE:</label>
             <select onChange={(e) => handleFilterByType(e)} className={s.fil}>
                 <option value="allt"></option>
                 {
                     allTypes?.map(e => (<option key={e.name} value={e.name}>{e.name.toUpperCase()}</option>))
                 }
                     
             </select>
                </div>
                
                <div>
                <label>FILTER BY ORIGIN:</label>
                <select className={s.filo} onChange={(e) => handleByFilterOrigin(e)}>

                    <option value="allp"></option>
                    <option value="exist">EXISTING</option>
                    <option value="created">CREATED</option>
                </select>
                </div>
                
            </div>

            <Paginado 
            pokemonsPerPage= {pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado = {paginado}
            currentPage = {currentPage} 
            
            />

            {
            currentPokemons.length?
            currentPokemons.length && currentPokemons.map((p,i) => <Card  key={i} {...p} />):
             <img src='https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif' alt="" />
            }

            <Footer/>


        </div>


    )
}