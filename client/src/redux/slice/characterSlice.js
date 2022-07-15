import { createSlice } from "@reduxjs/toolkit";

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    characterList: [],
    charactersCopy: [], //estado de copia para el filtro por status
    occupations: [],
    characterDetail: {},
    favorites: [],
  },
  reducers: {
    getCharacters: (state, action) => {
      return {
        ...state,
        characterList: action.payload,
        charactersCopy: action.payload,
      };
    },
    orderCharacters: (state, action) => {
      if (action.payload === "desc") {
        state.characterList.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      } else {
        state.characterList.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
      }
    },
    statusFilter: (state, action) => {
      let statusFilter =
        action.payload === "All"
          ? state.charactersCopy
          : state.charactersCopy.filter((el) => el.status === action.payload);
      return {
        ...state,
        characterList: statusFilter, //se toma como fuente el estado charactersCopy y se modifica al estado characterList
      };
    },
    sourceFilter: (state, action) => {
      if (action.payload === "dataBase") {
        let dataBase = state.charactersCopy.filter((el) => el.createdInDb);
        return {
          ...state,
          characterList: dataBase,
        };
      } else if (action.payload === "api") {
        let api = state.charactersCopy.filter((el) => !el.createdInDb);
        return {
          ...state,
          characterList: api,
        };
      } else {
        return {
          ...state,
          characterList: state.charactersCopy,
        };
      }
    },
    postCharacter: (state, action) => {
      return { ...state };
    },
    getOccupations: (state, action) => {
      return {
        ...state,
        occupations: action.payload,
      };
    },
    getCharacterDetail: (state, action) => {
      return {
        ...state,
        characterDetail: action.payload,
      };
    },
    addFavorite: (state, action) => {
      const favorite = state.characterList.find(
        (el) => el.id === action.payload
      );
      const add = state.favorites.find((el) => el.id === action.payload);
      if (!add) {
        return {
          ...state,
          favorites: [...state.favorites, favorite],
        };
      }
    },
    deleteFavorite: (state, action) => {
      const favoriteFilter = state.favorites.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        favorites: favoriteFilter,
      };
    },
  },
});

//acciones asincronicas
export const allCharacters = () => {
  return async (dispatch) => {
    try {
      let response = await fetch("http://localhost:3001/characters");
      let responseJson = await response.json();
      dispatch(getCharacters(responseJson));
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchCharacter = (name) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        `http://localhost:3001/characters?name=${name}`
      );
      let responseJson = await response.json();
      //console.log(responseJson);
      dispatch(getCharacters(responseJson));
    } catch (error) {
      console.log(error);
    }
  };
};

export const characterCreate = (character) => {
  return async (dispatch) => {
    try {
      console.log("character:", character);
      let response = await fetch("http://localhost:3001/character", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
      });
      let responseJson = await response.json();
      //console.log("responseJson:", responseJson);
      dispatch(postCharacter(responseJson));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOccupations = () => {
  return async (dispatch) => {
    try {
      let response = await fetch("http://localhost:3001/occupations");
      let responseJson = await response.json();
      dispatch(getOccupations(responseJson));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCharacterId = (id) => {
  return async (dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/characters/${id}`);
      let responseJson = await response.json();
      //console.log(responseJson);
      dispatch(getCharacterDetail(responseJson));
    } catch (error) {
      console.log(error);
    }
  };
};

//export actions y reducers.
export default characterSlice.reducer;
export const {
  getCharacters,
  getByName,
  orderCharacters,
  statusFilter,
  sourceFilter,
  postCharacter,
  getOccupations,
  getCharacterDetail,
  addFavorite,
  deleteFavorite,
} = characterSlice.actions;
