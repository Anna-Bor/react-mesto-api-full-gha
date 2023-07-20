import CloseButton from "../images/close-button.svg";
import { popupOptions } from "../utils/constants";
import { useEffect, useRef } from "react";
import { FormValidator } from "../utils/utils";

function PopupWithForm({
  name,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  header,
  children,
  buttonText,
}) {
  const formElementRef = useRef(undefined);

  useEffect(
    () =>
      new FormValidator(
        popupOptions.form,
        formElementRef.current
      ).enableValidation(),
    []
  );

  return (
    <section
      className={`popup popup_${name}${
        isOpen ? ` ${popupOptions.shared.openedPopupClass}` : ""
      }`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          className={`popup__close-button popup__close-button_${name}`}
          type="button"
        >
          <img className="popup__close-image" src={CloseButton} alt="Крестик" />
        </button>
        <h3 className="popup__title">{header}</h3>
        <form
          className={`popup__input-content popup__input-content_${name}`}
          name={name}
          method="dialog"
          onSubmit={(event) => onSubmit(event)}
          ref={formElementRef}
        >
          {children}
          <button
            className="popup__submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? popupOptions.form.loadingText : buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
