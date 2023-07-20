import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import { FormValidator } from "../utils/utils";
import { authFormOptions } from "../utils/constants";

function AuthForm({
  onSubmit,
  type,
  label,
  buttonText,
  isButtonDisabled,
  children,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formElementRef = useRef(undefined);

  useEffect(
    () =>
      new FormValidator(
        authFormOptions,
        formElementRef.current
      ).enableValidation(),
    []
  );

  const inputs = [
    {
      id: "email-input",
      name: "email",
      type: "email",
      placeholder: "Email",
      ariaLabel: "Поле введения электронной почты",
      value: email,
      onValueChange: setEmail,
      additionalProps: {
        minLength: 2,
        maxLength: 40,
      },
    },
    {
      id: "password-input",
      name: "password",
      type: "password",
      placeholder: "Пароль",
      ariaLabel: "Поле введения пароля",
      value: password,
      onValueChange: setPassword,
      additionalProps: {
        minLength: 2,
        maxLength: 12,
      },
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      email: email,
      password: password,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form form_${type}`}
      ref={formElementRef}
    >
      <h2 className="form__title">{label}</h2>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          id={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          ariaLabel={input.ariaLabel}
          value={input.value}
          onValueChange={input.onValueChange}
          additionalProps={input.additionalProps}
        />
      ))}
      <button
        className="form__submit-button"
        type="submit"
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>
      {children}
    </form>
  );
}

export default AuthForm;
