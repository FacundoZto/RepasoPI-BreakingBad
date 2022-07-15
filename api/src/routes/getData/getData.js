const axios = require("axios");
const { Character, Occupation } = require("../../db.js");

const getData = {
  getApiInfo: async () => {
    try {
      const apiUrl = await axios("https://breakingbadapi.com/api/characters");

      const apiInfo = await apiUrl.data.map((el) => {
        return {
          name: el.name,
          img: el.img,
          nickname: el.nickname,
          status: el.status,
          id: el.char_id,
          occupation: el.occupation,
          birthday: el.birthday,
          appearance: el.appearance,
        };
      });

      return apiInfo;
    } catch (error) {
      console.log(error);
    }
  },
  getDbInfo: async () => {
    return await Character.findAll({
      include: {
        model: Occupation,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  },
  getAllCharacters: async () => {
    const apiInfo = await getData.getApiInfo();
    const dbInfo = await getData.getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  },
  getOccupations: async () => {
    let apiInfo = await getData.getApiInfo();
    let occupations = apiInfo.map((el) => el.occupation); //[[], [], []]
    let stringOccupations = occupations.join(); //'High School Chemistry Teacher,Meth King Pin,Meth Dealer,House wife'
    let arrayOccupation = stringOccupations.split(","); //['High School Chemistry Teacher', 'Meth King Pin', 'Meth Dealer', 'House wife']

    arrayOccupation.forEach(async (occupation) => {
      await Occupation.findOrCreate({
        where: { name: occupation },
      });
    });
  },
};

module.exports = getData;
