import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name={"type_place"}
      header={"Новое место"}
      buttonText={"Создать"}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-holder">
        <input
          id="place-name-input"
          type="text"
          name="place"
          className="popup__field popup__field_name_name-place"
          placeholder="Название"
          aria-label="Поле редактирования названия места"
          minLength={2}
          maxLength={30}
          required="required"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__field-error place-name-input-error" />
      </label>
      <label className="popup__input-holder">
        <input
          id="place-description-input"
          type="url"
          name="link"
          className="popup__field popup__field_name_link"
          placeholder="Ссылка на картинку"
          aria-label="Поле редактирования ссылки на картинку"
          required="required"
          value={link ?? ""}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__field-error place-description-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
