import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import CharacterDetail from "./components/CharacterDetail.jsx";
import CreateCharacter from "./components/CreateCharacter.jsx";
import FavoritesCharacters from "./components/FavoritesCharacters.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<CharacterDetail />} />
      <Route path="/create" element={<CreateCharacter />} />
      <Route path="/favorites" element={<FavoritesCharacters />} />
    </Routes>
  );
}

export default App;
