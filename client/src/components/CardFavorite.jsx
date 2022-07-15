import { deleteFavorite } from "../redux/slice/characterSlice.js";
import { useDispatch } from "react-redux";

const CardFavorite = ({ name, nickname, birthday, id }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteFavorite(id));
  };

  return (
    <div>
      <h1>{name}</h1>
      <p>
        {nickname} | {birthday} | {id}
      </p>
      <button onClick={handleClick}>X</button>
    </div>
  );
};

export default CardFavorite;
