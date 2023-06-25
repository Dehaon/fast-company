export function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email или пароль введены не верно";

    case "EMAIL_EXISTS":
      return "Пользователь с таким Email существует";

    default:
      return "Слишком много попыток входа. Попробуйте позже";
  }
}
