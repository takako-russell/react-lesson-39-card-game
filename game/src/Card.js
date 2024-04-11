import React from "react";

function Card({ name, img }) {
  return <img className="Card" alt={name} src={img} />;
}

export default Card;
