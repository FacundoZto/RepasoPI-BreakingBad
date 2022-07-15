const { Router } = require("express");
//const axios = require("axios");
const { Occupation } = require("../db.js");
//const { getApiInfo } = require("./getData/getData.js");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    // let apiInfo = await getApiInfo();
    // let occupations = apiInfo.map((el) => el.occupation); //[[], [], []]
    // let stringOccupations = occupations.join(); //'High School Chemistry Teacher,Meth King Pin,Meth Dealer,House wife'
    // let arrayOccupation = stringOccupations.split(","); //['High School Chemistry Teacher', 'Meth King Pin', 'Meth Dealer', 'House wife']

    // arrayOccupation.forEach(async (occupation) => {
    //   await Occupation.findOrCreate({
    //     where: { name: occupation },
    //   });
    // });

    let occupationsDataBase = await Occupation.findAll();
    res.status(200).json(occupationsDataBase);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
