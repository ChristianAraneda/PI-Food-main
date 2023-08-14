export function validation(inputs) {
  const regexName = /^[A-Za-z\s]+$/;
  const regexImagen = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
  const regexSummary = /^(\S+\s+){4,}.*$/;

  let errors = {};

  if (!regexName.test(inputs.name)) {
    errors.name = "El nombre NO puede contener numeros.";

    if (!inputs.name) {
      errors.name = "La receta debe tener un nombre.";
    }
  }

  if (!regexSummary.test(inputs.summary)) {
    errors.summary =
      "La receta debe tener una descripcion que contenga al menos 5 palabras.";

    if (inputs.summary.length > 500) {
      errors.summary = "La descripcion NO puede tener más de 500 caracteres.";
    }
  }

  if (!regexImagen.test(inputs.image)) {
    errors.image = "La cadena no es una URL de imagen válida.";
  }

  if (inputs.name.length > 50) {
    errors.name = "El titulo NO puede tener más de 50 caracteres.";
  }

  if (inputs.healthScore == 0) {
    errors.healthScore = "El health Score no puede quedar en 0";
  }

  for (let i = 0; i < inputs.steps.length; i++) {
    if (!inputs.steps[i].step || inputs.steps[i].step.trim() === "") {
      errors.steps = "No se permite agregar un paso vacío";
      break; // Detener la validación si se encuentra un paso vacío
    }
  }

  return errors;
}
