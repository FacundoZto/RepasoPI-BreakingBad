import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacterId } from "../redux/slice/characterSlice.js";

const CharacterDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { characterDetail } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchCharacterId(params.id));
  }, [dispatch, params.id]);

  //console.log(characterDetail);

  return (
    <div>
      <Link to="/">
        <button>Vovler</button>
      </Link>

      <img
        src={characterDetail.img}
        alt="img not found"
        width="200px"
        height="250px"
      />
      <h1>{characterDetail.name ? characterDetail.name : "N/A"}</h1>
      <h3>{characterDetail.nickname ? characterDetail.nickname : "N/A"}</h3>
      <p>{characterDetail.birthday ? characterDetail.birthday : "N/A"}</p>
      <p>
        {characterDetail.occupations
          ? characterDetail.occupations.map((t, i) =>
              i === characterDetail.occupations.length - 1
                ? `${t.name}`
                : `${t.name}, `
            )
          : characterDetail.occupation}
      </p>
    </div>
  );
};

export default CharacterDetail;
