import AuthForm from "./AuthForm";
import { authFormOptions } from "../utils/constants";
import { Link } from "react-router-dom";

function Register({ onSubmit, isLoading }) {
  return (
    <section>
      <AuthForm
        onSubmit={onSubmit}
        type={"register"}
        buttonText={
          isLoading ? authFormOptions.loadingText : "Зарегистрироваться"
        }
        label={"Регистрация"}
        isButtonDisabled={isLoading}
      >
        <Link to="/sing-in" replace={true} className="form__link">
          Уже зарегистрированы? Войти
        </Link>
      </AuthForm>
    </section>
  );
}

export default Register;
