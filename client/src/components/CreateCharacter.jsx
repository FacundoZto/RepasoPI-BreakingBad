import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOccupations,
  characterCreate,
} from "../redux/slice/characterSlice.js";
import validate from "../validate/validate.js";

const CreateCharacter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const occupations = useSelector((state) => state.characters.occupations);

  const [state, setState] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: [],
    img: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(fetchOccupations());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setState({
        ...state,
        status: e.target.value,
      });
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    if (state.occupation.length < 5) {
      if (!state.occupation.includes(e.target.value)) {
        setState({
          ...state,
          occupation: [...state.occupation, e.target.value],
        });
      }
    }
  };

  const handleDeleteOccupation = (e) => {
    e.preventDefault();
    setState({
      ...state,
      occupation: state.occupation.filter(
        //devuelve solo los que no son ultimos
        (t, i) => i !== state.occupation.length - 1 && t
      ),
    });
    //devuelve solo el que sea ultimo:
    //i === state.occupation.length - 1 && t
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(characterCreate(state));
    alert("personaje creado");
    setState({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      occupation: [],
      img: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h1>CreateCharacter</h1>
      <form onSubmit={handleSubmit}>
        {error.name && <label>{error.name}</label>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        {error.nickname && <label>{error.nickname}</label>}
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Birthday"
          name="birthday"
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="Unknown"
            onChange={handleCheck}
            value="Unknown"
          />
          Unknown
        </label>
        <label>
          <input
            type="checkbox"
            name="Alive"
            onChange={handleCheck}
            value="Alive"
          />
          Alive
        </label>
        <label>
          <input
            type="checkbox"
            name="Deceased"
            onChange={handleCheck}
            value="Deceased"
          />
          Deseaced
        </label>

        {error.img && <label>{error.img}</label>}
        <input
          type="text"
          placeholder="Image"
          name="img"
          onChange={handleChange}
        />

        <div>
          <select onChange={handleSelect}>
            {occupations.map((occ, index) => (
              <option value={occ.name} key={index}>
                {occ.name}
              </option>
            ))}
          </select>
          {state.occupation.map((occ, i) =>
            i !== state.occupation.length - 1 ? occ + ", " : occ
          )}
          <button onClick={handleDeleteOccupation}>Borrar ocupación</button>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateCharacter;
