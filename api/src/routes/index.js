const { Router } = require('express');
const pokemons = require('./PokemonRoute');
const types = require('./TypesRoute');

const router = Router();

router.use('/pokemons', pokemons);
router.use('/types', types)


module.exports = router;
