import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {postPokemon, getTypes} from '../actions'
import { useDispatch, useSelector } from "react-redux";
import s from './CreatePokemon.module.css'
import swal from "sweetalert";


function validate(input){
    let err = {};
    if(!input.name) {err.name = '*A name is required'}
    if(input.hp && (input.hp < 30 || input.hp > 100)) {err.hp = '*Must be between 30 and 100'}
    if(input.attack && (input.attack < 30 || input.attack > 100)) {err.attack = '*Must be between 30 and 100'}
    if(input.defense && (input.defense < 30 || input.defense > 100)) {err.defense = '*Must be between 30 and 100'}
    if(input.speed && (input.speed < 30 || input.speed > 100)) {err.speed = '*Must be between 30 and 100'}
    if(input.height && (input.height < 0 || input.height > 40)) {err.height = '*Must be between 0 and 40'}
    if(input.weight && (input.weight < 0 || input.weight > 20)) {err.weight = '*Must be between 0 and 20'}
    return err;
}

export default function CreatePokemon(){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();

    const [input,setimput] = useState({
      name:'', img:'', hp:'', attack:'',defense:'',speed:'', height:'',weight:'',types: []
    });

    const [err, setErr] = useState({});

    useEffect(() => {
        dispatch(getTypes());
    },[dispatch]);

    function handleChange(e){
        setimput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErr(validate({
           ...input,
           [e.target.name] : e.target.value
        }))
    };

    function handleOptions(e){
        if(!input.types.includes(e.target.value)){
            setimput({
                ...input,
                types: [...input.types, e.target.value]
            })
        }
    };

    
    function handleSubmit(e){
        e.preventDefault()
        if(input.name && input.hp && input.attack && input.defense && input.speed && input.height && input.weight && input.types){
            if(err.name || err.hp || err.attack || err.defense || err.speed || err.height || err.weight || err.types){  
                swal({
                    text:'Error in any of the fields',
                    icon: 'warning'
                })
            }

            else{
                dispatch(postPokemon(input))
                swal({
                    text:'Pokemon Created successfully',
                    icon:'success',
                    timer: '4000'
                })
                setimput({
                    name:'', img:'', hp:'', attack:'', defense:'', speed:'', height:'', weight:'', types: []
                })
                history.push('/home');
                
            }
        }
        else{
            swal({
                text:'The only non-mandatory field is the img',
                icon:'warning',
                timer: '2000'
            })
        }
    }
    function handleSubmitVolver(e){
        e.preventDefault()
        history.push('/home')
    }
    // 'https://img1.freepng.es/20171220/xxq/question-mark-png-5a3a530b302187.6463118015137717871972.jpg'

    return(
        <div className={s.divPrincipal}>
            
            <div className={s.divInfo}>
                <h4>Your New Pokemon:</h4>
                <img src={input.img.length < 10? 'https://img1.freepng.es/20171220/xxq/question-mark-png-5a3a530b302187.6463118015137717871972.jpg' : input.img} alt=""  width='180px' height='200px'/>
                <div className={s.divUl}>
                <ul>
                    <li>Name: {input.name}</li>
                    <li>Hp: {input.hp}</li>
                    <li>Attack: {input.attack}</li>
                    <li>Defense: {input.defense}</li>
                    <li>Speed: {input.speed}</li>
                    <li>Heigth: {input.height}</li>
                    <li>Weigth: {input.weight}</li>
                    <li>Types: {input.types.map(e => {return e + '. '} )}</li>
                    
                </ul>
                </div>
            </div>

            <div className={s.divForm}>

            <form onSubmit={(e) => handleSubmit(e) } >

                <h4>Creating...</h4>
                
                <input type="text" value={input.name} name='name' onChange={(e) => handleChange(e)} placeholder="Insert name..." />
                {err.name && ( <h5 className={s.errorN}>{err.name}</h5>)}

    
                <input type="text" value={input.img} name='img' onChange={(e) => handleChange(e)} placeholder="Insert img..." />
                
                <input type="number" value={input.hp} name='hp' onChange={(e) => handleChange(e)} placeholder="Insert hp...
                " />
                {err.hp && ( <h5 className={s.errorHP}>{err.hp}</h5>)}

                <input type="number" value={input.attack} name='attack' onChange={(e) => handleChange(e)} placeholder="Insert attack..." />
                {err.attack && ( <h5 className={s.errorA}>{err.attack}</h5>)}

                <input type="number" value={input.defense} name='defense' onChange={(e) => handleChange(e)} placeholder="Insert defense..." />
                {err.defense && ( <h5 className={s.errorD}>{err.defense}</h5>)}
                
                <input type="number" value={input.speed} name='speed' onChange={(e) => handleChange(e)} placeholder="Insert speed..." />
                {err.speed && ( <h5 className={s.errorS}>{err.speed}</h5>)}

                
                <input type="number" value={input.height} name='height' onChange={(e) => handleChange(e)} placeholder="Insert height..." />
                {err.height && ( <h5 className={s.errorH}>{err.height}</h5>)}

                
                <input type="number" value={input.weight} name='weight' onChange={(e) => handleChange(e)} placeholder="Insert weight..." />
                {err.weight && ( <h5 className={s.errorW}>{err.weight}</h5>)}

                <select className={s.sel} onChange={(e) => handleOptions(e)}>
                    <option value="vacio"></option>
                    {
                         types.map((t) => ( <option key={t.name} value={t.name}>{t.name}</option>))
                    }
                </select>
                   {/* {
                        input.types.map(t => 
                            <div className={s.divDelete}>
                                <h5 className={s.h5Delete}>{t}</h5> <button className={s.btnDelete} onClick={() => handleDelete(t)}>X</button>
                                
                            </div>
                            )
                    } */}

                <button className={s.crear}>Crear</button>
            </form>

            </div>

               <button  onClick={handleSubmitVolver}  className={s.btnVolver}></button>
            
        </div>
    )
}