const validate = (state) => {
  let errors = {};

  if (state.name) {
    if (!/^[a-zA-Z ]*$/.test(state.name)) {
      errors.name = "Sólo se permite caracteres alfabéticos";
    }
  }

  if (state.nickname) {
    if (!/^[a-zA-Z ]*$/.test(state.nickname)) {
      errors.nickname = "Sólo se permite caracteres alfabéticos";
    }
  }

  if (state.img) {
    if (state.img.length > 255) {
      errors.img = "The address is too long";
    } else if (
      !state.img.includes("jpg") &&
      !state.img.includes("jpeg") &&
      !state.img.includes("png")
    ) {
      errors.img = "Allowed format: jpg, jpeg or png";
    } else if (
      !state.img.includes("https") &&
      !state.img.includes("http") &&
      !state.img.includes("ftp")
    ) {
      errors.img = "Must be an url image";
    }
  }

  return errors;
};

export default validate;
