import { useSelector } from "react-redux";
import CardFavorite from "./CardFavorite.jsx";

const FavoritesCharacters = () => {
  const { favorites } = useSelector((state) => state.characters);

  return (
    <div>
      <h1>FavoritesCharacters</h1>
      {favorites?.map((el) => (
        <CardFavorite
          key={el.id}
          name={el.name}
          nickname={el.nickname}
          birthday={el.birthday}
          id={el.id}
        />
      ))}
    </div>
  );
};

export default FavoritesCharacters;
