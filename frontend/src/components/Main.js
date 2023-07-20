import { useContext } from "react";
import Pencil from "../images/pencil.svg";
import Plus from "../images/plus.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onAddPlace,
  onCardLike,
  onDeleteCard,
  onEditAvatar,
  onEditProfile,
  setSelectedCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser?.avatar}
            alt="Аватар автора"
          />
          <button className="profile__avatar-button" type="button">
            <img
              className="profile__image-button"
              src={Pencil}
              alt="Карандаш"
            />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__header-author">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            >
              <img src={Pencil} alt="Карандаш" />
            </button>
          </div>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img className="profile__add-button-image" src={Plus} alt="Плюс" />
        </button>
      </section>
      <ul className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={setSelectedCard}
            onCardLike={onCardLike}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
