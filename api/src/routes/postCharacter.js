const { Router } = require("express");
const { Character, Occupation } = require("../db.js");

const router = Router();

router.post("/", async (req, res, next) => {
  const { name, nickname, status, birthday, occupation, img, createdInDb } =
    req.body;

  try {
    let createCharacter = await Character.create({
      name,
      nickname,
      birthday,
      status,
      img,
      createdInDb,
    });

    let occupationsDb = await Occupation.findAll({
      where: {
        name: occupation,
      },
    });

    await createCharacter.addOccupation(occupationsDb);

    res.send("Has creado un personaje");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
