import React from "react";
import { NavLink } from "react-router-dom";
import "./Card-item.css";

const CardItem = (props) => {
  const confirmDeleteHandler = async () => {
    // console.log("Deleted");

    try {
      await fetch(
        `http://localhost:5000/api/${props.route}/${props.oeuvre.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            // Authorization: "Bearer " + auth.token,
          },
        }
      ).catch((error) => {
        console.log(error);
      });

      props.onDelete(props.oeuvre.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-container">
      <img
        alt={props.oeuvre.titre}
        className="image"
        src={props.oeuvre.imageUrl}
      />
      <h1>{props.oeuvre.titre}</h1>
      <p>
        {props.oeuvre.auteur} - {props.oeuvre.annee}
      </p>
      <div className="card-item__actions">
        <ul>
          <li>
            <button>
              <NavLink to={`/${props.route}/${props.oeuvre.id}`}>
                Editer
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={confirmDeleteHandler}>Supprimer</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardItem;
