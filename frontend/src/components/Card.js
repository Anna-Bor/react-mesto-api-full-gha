import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteCard }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.includes(currentUser._id);

  const cardLikeButtonClassName = `place__heart-button${
    isLiked ? " place__heart-button_active" : ""
  }`;

  return (
    <li className="place">
      <img
        className="place__picture"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      {isOwn && (
        <button
          className="place__trash-button"
          type="button"
          onClick={() => onDeleteCard(card)}
        ></button>
      )}
      <div className="place__information">
        <h2 className="place__header">{card.name}</h2>
        <div className="place__heart-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          ></button>
          <p className="place__number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
