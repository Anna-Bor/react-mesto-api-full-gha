import CloseButton from "../images/close-button.svg";
import Success from "../images/success.svg";
import Fail from "../images/fail.svg";
import { popupOptions, tooltipOptions } from "../utils/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InfoTooltip({ onClose, isOpen, status }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (status === tooltipOptions.statuses.success && !isOpen) {
      navigate("/signin", { replace: true });
    }
  }, [isOpen, status]);

  return (
    <section
      className={`popup popup_type_tooltip${
        isOpen ? ` ${popupOptions.shared.openedPopupClass}` : ""
      }`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          className={`popup__close-button popup__close-button_tooltip`}
          type="button"
        >
          <img className="popup__close-image" src={CloseButton} alt="Крестик" />
        </button>
        <div className="popup__tooltip-holder">
          <img
            src={status === tooltipOptions.statuses.success ? Success : Fail}
            alt={status === tooltipOptions.statuses.success ? "Галка" : "Крест"}
          />
          <h3 className="popup__tooltip-status">
            {status === tooltipOptions.statuses.success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
