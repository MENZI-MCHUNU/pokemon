import React, { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";
function SideNavigation(props) {
  const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } =
    props;
  const [searchValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((element, elementIndex) => {
    if (getFullPokedexNumber(elementIndex).includes(searchValue)) {
      return true;
    }

    if (element.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }

    return false;
  });

  return (
    <nav className="p-4 pt-0 overflow-y-auto flex flex-col items-start gap-1 h-[100vh] top-0 left-0 w-[20vw] z-10 bg-white scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">
      <div className="flex items-center gap-4 p-4 pb-0">
        <h1 className="pb-2 text-lg leading-10">Pokedex</h1>
      </div>
      {/* <input type="text" name="price" id="price" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="0.00"> */}
      <input
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        type="text"
        placeholder="pokedex"
        className="sm:flex-1 max-sm:w-full text-base leading-normal text-slate-600 grow py-1.5 pr-3 pl-5 max-sm:p-5 outline-none border-2 border-slate-700 rounded-full"
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokedexNumber = first151Pokemon.indexOf(pokemon);
        return (
          <button
            onClick={() => {
              setSelectedPokemon(truePokedexNumber);
            }}
            key={pokemonIndex}
            className={
              " justify-center items-center px-7 py-4 border text-lg leading-none bg-blue-700 border-blue-900 rounded-full cursor-pointer border-none flex gap-2 p-0 hover:translate-0 " +
              (pokemonIndex === selectedPokemon
                ? "bg-green-500 border-amber-400 "
                : " ")
            }
          >
            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}

export default SideNavigation;
