import React, { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";

function PokeCard(props) {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState(null);
  const [loadingSkill, setLoadingSkill] = useState(false);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    }
    if (["versions", "other"].includes(val)) {
      return false;
    }
    return true;
  });

  async function fetchMoveData(move, moveUrl) {
    if (loadingSkill || !localStorage || !moveUrl) {
      return;
    }

    let c = {};
    if (localStorage.getItem("pokemon-moves")) {
      c = JSON.parse(localStorage.getItem("pokemon-moves"));
    }

    if (move in c) {
      setSkill(c[move]);
      console.log("Found move in cache");
      return;
    }

    try {
      setLoadingSkill(true);
      const res = await fetch(moveUrl);
      const moveData = await res.json();
      console.log("Fetched move from API", moveData);

      const description = moveData?.flavor_text_entries.filter((val) => {
        return val.version_group.name == "firered-leafgreen";
      })[0]?.flavor_text;

      const skillData = {
        name: move,
        description,
      };
      setSkill(skillData);
      c[move] = skillData;
      localStorage.setItem("pokemon-moves", JSON.stringify(c));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSkill(false);
    }
  }

  useEffect(() => {
    if (loading || !localStorage) {
      return;
    }

    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }

    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon]);
      console.log("Found pokemon in cache");
      return;
    }

    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalUrl = baseUrl + suffix;
        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log("Fetched pokemon data");
        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 w-full gap-4">
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className="capitalize">{skill.name.replaceAll("-", " ")}</h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {types.map((typeObject, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObject?.type?.name} />;
        })}
      </div>
      <img
        className="w-3xs"
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img`}
      />
      <div className="flex items-center gap-2 flex-wrap">
        {imgList.map((spriteUrl, spriteIndex) => {
          const imgUrl = sprites[spriteUrl];
          return (
            <img
              key={spriteIndex}
              src={imgUrl}
              alt={`${name}-img-${spriteUrl}`}
            />
          );
        })}
      </div>
      <h3>Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((statObj, statIndex) => {
          const { stat, base_stat } = statObj;
          return (
            <div key={statIndex} className="flex items-center gap-1">
              <p className="capitalize whitespace-nowrap">
                {stat?.name.replaceAll("-", " ")}
              </p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>
      <h3>Moves</h3>
      <div className="flex items-center flex-wrap gap-4">
        {moves.map((moveObj, moveIndex) => {
          return (
            <button
              className="bg-blue-50 text-black p-4 rounded-lg border-2 border-solid border-b-blue-700 w-full flex-1"
              key={moveIndex}
              onClick={() => {
                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
              }}
            >
              <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PokeCard;
