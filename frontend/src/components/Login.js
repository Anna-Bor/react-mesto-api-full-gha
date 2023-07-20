import AuthForm from "./AuthForm";
import { authFormOptions } from "../utils/constants";

function Login({ onSubmit, isLoading }) {
  return (
    <section>
      <AuthForm
        onSubmit={onSubmit}
        type={"login"}
        buttonText={isLoading ? authFormOptions.loadingText : "Войти"}
        label={"Вход"}
        isButtonDisabled={isLoading}
      />
    </section>
  );
}

export default Login;
