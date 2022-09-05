const axios = require('axios')
const {Pokemon, Type} = require('../db.js');

const getApiPokemon = async () => {
    try {
      const totalPokemons = 40;
      const apiPokemons = [];
      const pokemonRequest = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`);
      const urlPokemonSubrequest = pokemonRequest.data.results.map((pokemon) => pokemon.url);
      await axios.all(urlPokemonSubrequest.map(u => axios.get(u)))
        .then((foundPokemons) => {
          foundPokemons.map((pok) =>
            apiPokemons.push({
              id: pok.data.id,
              name: pok.data.name,
              img: pok.data.sprites.other.dream_world.front_default,
              hp: pok.data.stats[0].base_stat,
              attack: pok.data.stats[1].base_stat,
              defense: pok.data.stats[2].base_stat,
              speed: pok.data.stats[5].base_stat,
              height: pok.data.height,
              weight: pok.data.weight,
              types: pok.data.types.map((t) => t.type),
            })
            );
        });
        
        return apiPokemons
    } catch (err) {
      console.log(err)
    }
  };

const getDbPokemon = async() => {
    try{
       return await Pokemon.findAll({
         include:{
           model: Type,
           attributes: ["name"],
           through: {
             attributes: []
           }
         }
       })
    }
    catch(err){
        console.log(err);
    }
}

const getAllPokemons = async() => {
  try{
    const infoPokemon = await getApiPokemon();
    const infoDb = await getDbPokemon();
    const infoFinal = infoPokemon.concat(infoDb);
    return infoFinal;
  }
  catch(err){
    console.log(err)
  }
}

module.exports = {
  getApiPokemon,
  getDbPokemon,
  getAllPokemons
}