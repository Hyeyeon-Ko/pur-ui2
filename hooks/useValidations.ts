const useValidations = () => {
  const IdValidate = (value: string) => {
    if (value.length < 10) {
      return { isValid: false, message: "최소 10자 이상 입력해야 합니다." };
    }
    return { isValid: true, message: "" };
  };

  const passwordValidation = (value: string) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    if (!regex.test(value)) {
      return {
        isValid: false,
        message:
          "대소문자와 숫자, 특수문자를 포함하여 최소 10자 이상 입력해야 합니다.",
      };
    }
    return { isValid: true, message: "" };
  };

  return { IdValidate, passwordValidation };
};

export default useValidations;
