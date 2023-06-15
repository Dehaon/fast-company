const validatorConfig = {
  email: {
    isRequired: { message: "Электронная почта обязательна для заполнения" },
    isEmail: { message: "Email введен некорректно" }
  },
  name: {
    isRequired: { message: "Имя обязательно для заполнения" },
    min: { message: "Имя должено состоять минимум из 3 символов", value: 3 }
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
  content: {
    isRequired: { message: "Поле не может быть пустым" }
  }
};

export default validatorConfig;
