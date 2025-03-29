import React from "react";
import { pokemonTypeColors } from "../utils";

function TypeCard(props) {
  const { type } = props;
  return (
    <div
      className="sm:p-0.5 p-2 rounded-lg text-2xl w-fit font-semibold"
      style={{
        color: pokemonTypeColors?.[type]?.color,
        background: pokemonTypeColors?.[type]?.background,
      }}
    >
      <p>{type}</p>
    </div>
  );
}

export default TypeCard;
