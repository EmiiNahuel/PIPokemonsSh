const { Router } = require('express');
const { Type} = require('../db.js');
const axios = require('axios')

const router = Router();

router.get('/', async(req, res) => {
    try{
      const typesDb = await Type.findAll();
      if(!typesDb.length){
        const typeInfo  = await axios.get('https://pokeapi.co/api/v2/type');
        const typeInfo2 = typeInfo.data.results.map(el => axios.get(el.url))
        const typeInfo3 = await axios.all(typeInfo2);
        const typeFinal = await typeInfo3.map(el => {
          return {
            id: el.data.id,
            name: el.data.name
          }
        })
        await Type.bulkCreate(typeFinal);
  
        const newTypesDb = await Type.findAll({
          attributes: ['id', 'name'],
          
        })
        return res.json(newTypesDb);
      }
      res.send(typesDb);
    }
    catch(err){
      res.status(400).send(err);
    }
  })

  module.exports = router;