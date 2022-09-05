const initialState = {
    pokemons : [],
    allPokemons: [],
    types: [],
    details: [],
    page: 1

    
}

export default function rootReducer(state= initialState, action){  
    switch(action.type){
        case 'GET_POKEMONS':
        return{
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload,
            
            
        }
        case 'GET_POKEMONS_NAME':
            return{
                ...state,
                pokemons: action.payload
            }

        case 'GET_TYPES':
            return{
                   ...state,
                   types: action.payload
                }
        
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        
        case 'CLEAR_DETAILS':
            return{
                ...state,
                details: []
            }

        case 'POST_POKEMON':
            return{
                ...state
            }

        case 'ORDER_ATTACK/NAME':
            const orderASC = action.payload === 'asc'?
            state.pokemons.sort(function(a, b) {
                if( a.attack > b.attack){
                    return 1;
                }
                if( a.attack < b.attack){
                    return -1
                }
                return 0;
            }) : action.payload === 'desc'?
            state.pokemons.sort(function(a, b){
                if( a.attack > b.attack){
                    return -1;
                }
                if( a.attack < b.attack){
                    return 1
                }
                return 0
            }) : action.payload === 'az'?
            state.pokemons.sort(function(a, b) {
                if( a.name.toLowerCase()> b.name.toLowerCase()){
                    return 1;
                }
                if( a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1
                }
                return 0;
            }) : action.payload === 'za'?
            state.pokemons.sort(function(a, b){
                if( a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if( a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1
                }
                return 0
            }): state.pokemons

            return{
                ...state,
                pokemons: orderASC

            }

        case 'FILTER_TYPES':
            const allPokemons = state.allPokemons;
            const filters = action.payload === 'allt' ? allPokemons : allPokemons.filter((e) => e.types.includes(action.payload) || e.types.find(e => e.name === action.payload))
            return{
                ...state,
                pokemons: filters
            }


        
            
        case 'GET_CREATED':
            const created = action.payload === 'created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
            return{
                ...state,
                pokemons: action.payload === 'allp' ? state.allPokemons : created

            }

        case 'UPDATE_PAGE':
            return{
                ...state,
                page: action.payload
            }

        default: return state
    }
}