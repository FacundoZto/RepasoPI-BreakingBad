import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchCharacter } from "../redux/slice/characterSlice.js";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    dispatch(searchCharacter(input));
    // setTimeout(() => {
    //   setInput("");
    // }, 6000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCharacter(input));
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={input} />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
