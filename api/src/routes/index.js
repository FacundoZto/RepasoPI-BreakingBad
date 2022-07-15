const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getCharacters = require("./getCharacters.js");
const getOccupations = require("./getOccupations.js");
const postCharacter = require("./postCharacter.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/characters", getCharacters);
router.use("/occupations", getOccupations);
router.use("/character", postCharacter);

module.exports = router;
