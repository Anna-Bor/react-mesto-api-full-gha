import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef(undefined);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"type_avatar"}
      header={"Обновить аватар"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-holder">
        <input
          id="avatar-url-input"
          type="url"
          name="url"
          className="popup__field popup__field_name_url"
          placeholder="Ссылка на аватар"
          aria-label="Поле редактирования аватара"
          required="required"
          ref={avatarInputRef}
        />
        <span className="popup__field-error avatar-url-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
