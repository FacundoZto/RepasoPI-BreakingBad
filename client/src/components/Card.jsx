import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../redux/slice/characterSlice.js";

const Card = ({ img, name, nickname, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addFavorite(id));
    console.log("id enviado:", id);
    navigate("/favorites");
  };

  return (
    <div>
      <Link to={`/detail/${id}`}>
        <img src={img} alt="character" width="200px" height="220px" />
        <h3>
          {name} - {nickname}
        </h3>
      </Link>
      <button onClick={handleClick}>Añadir a favoritos</button>
    </div>
  );
};

export default Card;
