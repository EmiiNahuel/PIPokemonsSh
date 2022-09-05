import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        try{
            const info = await axios.get('/pokemons');
            return dispatch({
                type: 'GET_POKEMONS',
                payload: info.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getPokemonsName(name){
    return async function(dispatch){
        try{
            const info = await axios.get(`/pokemons?name=${name}`);
            return dispatch({
                type: 'GET_POKEMONS_NAME',
                payload: info.data
            })
        }
        catch(err){
            console.log(err.message)
        }
    }
}

export function getTypes(){
    return async function(dispatch){
        try{
            const info = await axios.get('/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: info.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getDetails(id){
    return async function(dispatch){
        try{
            const info = await axios.get(`/pokemons/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload:info.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function clearDetails(){
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_DETAILS'
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        try{
            const info = await axios.post('/pokemons', payload);
            return info;
        }
        catch(err){
            console.log(err)
        }
    }
}

export function orderByAttackName(payload){
    return{
        type: 'ORDER_ATTACK/NAME',
        payload,
    }
}

export function pokemonFilterByType(payload){
    return{
        type: 'FILTER_TYPES',
        payload
    }
}

export function pokemonFilterByOrigin(payload){
    return({
        type:'GET_CREATED',
        payload,
    })
}

export function updatePage(page){
    return(dispatch) => {
        dispatch({
            type: 'UPDATE_PAGE',
            payload:page
        })
    }
}

