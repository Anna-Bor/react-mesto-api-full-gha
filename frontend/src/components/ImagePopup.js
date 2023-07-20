import CloseButton from "../images/close-button.svg";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_image${card ? " popup_opened" : ""}`}
      aria-label="Просмотр картинки"
      onClick={onClose}
    >
      <div className="popup__figure-container">
        <button
          className="popup__close-button popup__close-button_show-image"
          type="button"
        >
          <img className="popup__close-image" src={CloseButton} alt="Крестик" />
        </button>
        <figure className="popup__picture">
          <img
            className="popup__image-container"
            src={card?.link}
            alt={card?.name}
          />
          <figcaption className="popup__image-caption">{card?.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
