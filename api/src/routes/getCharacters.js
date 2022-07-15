const { Router } = require("express");
const { getAllCharacters } = require("./getData/getData.js");

const router = Router();

//ruta para devolver todos los characters o el buscado por query
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    let charactersTotal = await getAllCharacters();

    //si existe un query, devolver el character buscado
    if (name) {
      let characterName = await charactersTotal.filter((el) => {
        return el.name.toLowerCase().includes(name.toLowerCase());
      });

      characterName.length
        ? res.status(200).json(characterName)
        : res.status(404).json(["No se encuentra el personaje"]);
    } else {
      //si no hay un query, envio todos los characters
      res.status(200).send(charactersTotal);
    }
  } catch (error) {
    next(error);
  }
});

// ruta para params
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let characters = await getAllCharacters();

    if (id && characters) {
      let character = characters.find((character) => character.id == id);
      character
        ? res.status(200).json(character)
        : res.status(300).send("Personaje no encontrado");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
