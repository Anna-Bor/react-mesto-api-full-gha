export const urls = {
  baseUrl: "https://api.annabor.nomoreparties.sbs",
  cardsUrl: "cards",
  authorUrl: "users/me",
  authorAvatarUrl: "users/me/avatar",
  cardUrl: {
    template: "cards/{{cardId}}",
    key: "{{cardId}}",
  },
  likeUrl: {
    template: "cards/{{cardId}}/likes",
    key: "{{cardId}}",
  },
  registerUrl: "signup",
  loginUrl: "signin",
  userUrl: "users/me",
};

export const localStorageKey = "mesto-token";

export const popupOptions = {
  shared: {
    openedPopupClass: "popup_opened",
    closeElementClass: "popup__close-image",
  },
  form: {
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__field_invalid",
    errorClass: "popup__field-error_active",
    loadingText: "Загрузка...",
  },
  addPlace: {
    popupSelector: ".popup_type_place",
  },
  editAuthor: {
    popupSelector: ".popup_type_author",
  },
  showImagePopup: {
    popupSelector: ".popup_type_image",
    imageContainerSelector: ".popup__image-container",
    imageCaptionSelector: ".popup__image-caption",
  },
  confirmPopup: {
    popupSelector: ".popup_type_confirm",
  },
  changeAvatar: {
    popupSelector: ".popup_type_avatar",
  },
};

export const authFormOptions = {
  inputSelector: ".form__field",
  submitButtonSelector: ".form__submit-button",
  inputErrorClass: "form__field_invalid",
  errorClass: "popup__field-error_active",
  inactiveButtonClass: "form__submit-button_inactive",
  loadingText: "Загрузка...",
};

export const tooltipOptions = {
  statuses: {
    success: "success",
    fail: "fail",
  },
};
