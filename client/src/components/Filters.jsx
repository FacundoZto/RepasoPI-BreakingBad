import { useDispatch } from "react-redux";
import {
  orderCharacters,
  statusFilter,
  sourceFilter,
} from "../redux/slice/characterSlice.js";

const Filters = () => {
  const dispatch = useDispatch();

  const handleOrder = (event) => {
    dispatch(orderCharacters(event.target.value));
  };

  const handleStatus = (event) => {
    dispatch(statusFilter(event.target.value));
  };

  const handleSource = (event) => {
    dispatch(sourceFilter(event.target.value));
    console.log(event.target.value);
  };

  return (
    <div>
      <select onChange={handleOrder}>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A </option>
      </select>
      <select onChange={handleStatus}>
        <option value="All">Todos</option>
        <option value="Alive">Vivo</option>
        <option value="Deceased">Muerto</option>
        <option value="Unknown">Desconocido</option>
        <option value="Presumed dead">Presuntamente muerto</option>
      </select>
      <select onChange={handleSource}>
        <option value="All">Todos</option>
        <option value="dataBase">Creados</option>
        <option value="api">Existentes</option>
      </select>
    </div>
  );
};

export default Filters;
