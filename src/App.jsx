import { useState } from "react";
import Header from "./components/Header";
import SideNavigation from "./components/SideNavigation";
import PokeCard from "./components/PokeCard";
function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return (
    <main>
      <div className="flex">
        <SideNavigation
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
        <PokeCard selectedPokemon={selectedPokemon} />
      </div>
    </main>
  );
}

export default App;
