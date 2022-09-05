const { Router } = require('express');
const {Pokemon, Type} = require('../db.js')
const {getAllPokemons} = require('../controllers/methodsRoutes')
const router = Router();

router.get('/', async (req, res) => {
    try{
        const { name } = req.query;
        let allPokemons = await getAllPokemons();
        if(name){ 
          let pokemonName = allPokemons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
          pokemonName.length ?
          res.json(pokemonName):
          res.status(404).send('No existe ese Pokemon solicitado')
        }
        else{
          res.json(allPokemons); 
        }
    }
    catch(err){
        res.send(err)
    }
})

router.get('/:idPokemon', async(req, res) => {
    try{
      const allPokemons = await getAllPokemons();
      const { idPokemon } = req.params;
      if(idPokemon){
        const pokemonId = allPokemons.filter(p => p.id == idPokemon);
        pokemonId.length ?
        res.json(pokemonId):
        res.status(404).send('No existe un Pokemon con ese ID')
      } 
    }
    catch(err){
      res.status(400).send(err);
    }
})


router.post('/', async(req, res) => {
  try{
    const { name, hp, attack, defense, speed, height, weight,img, createdInDB, types} = req.body;
    if(!name) { return res.status(404).send('Debe indicar un name al pokemon para poder crearlo')}    
    let newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        createdInDB
      })
      
        let typeCreate = await Type.findAll({
          where: { name: types}
        })
        newPokemon.addType(typeCreate)

        res.send(`Pokemon ${name} creado con exito`)
  }
  catch(err){
    res.status(400).send(err)
  }
})

module.exports = router;