import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      description,
    });
  }

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"type_author"}
      header={"Редактировать профиль"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-holder">
        <input
          id="name-input"
          type="text"
          name="name"
          className="popup__field popup__field_name_name"
          placeholder="Имя"
          aria-label="Поле редактирования имени автора"
          minLength={2}
          maxLength={40}
          required="required"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__field-error name-input-error" />
      </label>
      <label className="popup__input-holder">
        <input
          id="description-input"
          type="text"
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          className="popup__field popup__field_name_description"
          placeholder="Профессия"
          aria-label="Поле редактирования описания автора"
          minLength={2}
          maxLength={200}
          required="required"
        />
        <span className="popup__field-error description-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
