import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allCharacters } from "../redux/slice/characterSlice.js";
import Card from "./Card.jsx";
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";
import SearchBar from "./SearchBar.jsx";

const Home = () => {
  const dispatch = useDispatch();

  //estado global de characters
  const { characterList } = useSelector((state) => state.characters);

  //Paginado
  const [page, setPage] = useState(1); //pagina actual
  const charactersPerPage = 6; //cantidad por pagina
  const indexLastCharacter = page * charactersPerPage; // pag1 = 1*6 = 6 ; pag2 = 2*6 = 12
  const indexFirstCharacter = indexLastCharacter - charactersPerPage; //pag1 = 6-6 = 0 ; pag2 = 12-6 = 6
  // characters a mostrar por pagina
  const characters = characterList.slice(
    indexFirstCharacter,
    indexLastCharacter
  );

  //cargo el estado global con los characters
  useEffect(() => {
    dispatch(allCharacters());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <button onClick={() => dispatch(allCharacters())}>Todos</button>
      <Link to="/favorites">Ver Favoritos</Link>
      <h1>Breaking Bad</h1>
      <Link to="/create">Crear un Personaje</Link>
      <Filters />
      <Pagination
        page={page}
        setPage={setPage}
        charactersPerPage={charactersPerPage}
        characterList={characterList}
      />
      <div>
        {characters ? (
          characters.map((el) => (
            <Card
              key={el.id}
              img={el.img}
              name={el.name}
              nickname={el.nickname}
              id={el.id}
            />
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default Home;
