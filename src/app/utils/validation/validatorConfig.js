const validatorConfig = {
  email: {
    isRequired: { message: "Электронная почта обязательна для заполнения" },
    isEmail: { message: "Email введен некорректно" }
  },
  password: {
    isRequired: { message: "Пароль обязателен для заполнения" },
    isCapitalSymbol: {
      message: "Пароль должен содержать хотя бы одну заглавную букву"
    },
    isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
    min: { message: "Пароль должен состоять минимум из 8 символов", value: 8 }
  },
  profession: {
    isRequired: { message: "Обязательно выберете вашу профессию" }
  },
  licence: {
    isRequired: {
      message:
        "Вы не можите использовать наш сервис без подтверждения лицензионого соглашения"
    }
  },
  userId: {
    isRequired: { message: "Обязательно выберете пользователя" }
  },
  content: {
    isRequired: { message: "Поле не может быть пустым" }
  }
};

export default validatorConfig;
