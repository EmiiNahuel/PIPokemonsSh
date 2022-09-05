import React from "react";
import s from './Paginado.module.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado }){
    const arrPokemons = [];

    for(let i=0; i <= Math.floor(allPokemons/pokemonsPerPage); i++){
        arrPokemons.push(i+1)
    }

    return(
        <div className={s.divUl}>
            <ul className={s.paginado}>
                {
                    arrPokemons && arrPokemons.map(e => {
                        return(<li key={e}>
                            <button onClick={() => paginado(e)}>{e}</button>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}