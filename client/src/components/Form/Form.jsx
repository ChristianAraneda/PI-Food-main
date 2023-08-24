import style from "./Form.module.css";
import { getDietTypes, addRecipe } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons/";
import Nav from "../Nav/Nav";
import { validation } from "./_validation";

const Form = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  //DIET TAGS

  const dietTypes = useSelector((state) => state.dietTypes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDietTypes());
  }, []);

  const [tags, setTags] = useState([]);
  const [inputDieta, setInputDieta] = useState("");

  const handleChangeDiet = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    if (inputValue.length <= 30) {
      setInputDieta(inputValue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    if (event.target.name === "DietTypes" && event.target.value.trim() !== "") {
      const value = event.target.value;
      if (tags.includes(value)) {
        setInputDieta("");
        event.preventDefault();
        return;
      }
      setTags([...tags, value]);
      setInputDieta("");
      event.preventDefault();
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  //STEPS

  const [step, setStep] = useState([]);

  const handleChangeSteps = (index, value) => {
    const newSteps = [...step];
    newSteps[index] = {
      number: index + 1,
      step: value,
    };
    setStep(newSteps);

    setErrors(validation({ ...recipeData, steps: newSteps }));
  };

  const handleStepKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleAddStep = (event) => {
    event.preventDefault();

    if (event.target.name === "addStepButton") {
      const lastStep = step[step.length - 1];
      if (!lastStep || lastStep.step.trim() !== "") {
        setStep([...step, { number: step.length + 1, step: "" }]);
      }
    }
  };

  const handleRemoveStep = (event) => {
    event.preventDefault();
    if (step.length > 0) {
      const newSteps = [...step];
      newSteps.pop();
      setStep(newSteps);
    }
  };

  //VALIDACIONES Y ERRORES

  const [errors, setErrors] = useState({});

  //POST RECIPE

  const [recipeData, setRecipeData] = useState({
    name: "",
    summary: "",
    healthScore: "0",
    image: "",
    diets: tags,
    steps: step,
  });

  const handleChange = (event) => {
    console.log(event.target.name);
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value,
    });
    // event.preventDefault();
    setErrors(
      validation({
        ...recipeData,
        [event.target.name]: event.target.value,
      })
    );
  };

  useEffect(() => {
    setRecipeData({ ...recipeData, diets: tags });
  }, [tags]);

  useEffect(() => {
    setRecipeData({ ...recipeData, steps: step });
  }, [step]);

  //FORM

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(addRecipe(recipeData));
    setFormSubmitted(true);
    setStep([]);
    setTags([]);
    setRecipeData({
      name: "",
      summary: "",
      healthScore: "0",
      image: "",
      diets: tags,
      steps: step,
    });
  };

  const handleAddAnotherRecipe = () => {
    setFormSubmitted(false);
  };

  return (
    <div className={style.mainCont}>
      <Nav></Nav>
      {formSubmitted ? (
        <div className={style.cardCont}>
          <p
            style={{
              textAlign: "center",
            }}>
            <Unicons.UilCheckCircle
              size="25"
              style={{
                color: "green",
                verticalAlign: "middle",
                marginRight: ".5rem",
              }}
            />
            El formulario se envió correctamente.
          </p>
          <button
            className={style.botonEnviar}
            onClick={handleAddAnotherRecipe}>
            Agregar Otra Receta
          </button>
        </div>
      ) : (
        <form
          className={style.cardCont}
          onSubmit={handleFormSubmit}
          onKeyDown={handleStepKeyDown}>
          <label htmlFor="name">Nombre </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Ingrese nombre de la receta"
            style={{ borderColor: errors.name ? "red" : "" }}
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}
          <label htmlFor="image">Imagen</label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            placeholder="URL Imagen"
            style={{ borderColor: errors.image ? "red" : "" }}
          />
          {errors.image && <span className={style.error}>{errors.image}</span>}
          <label htmlFor="summary">Summary</label>
          <textarea
            name="summary"
            cols="30"
            rows="10"
            onChange={handleChange}
            placeholder="Descripción de la receta"
            style={{ borderColor: errors.summary ? "red" : "" }}></textarea>
          {errors.summary && (
            <span className={style.error}>{errors.summary}</span>
          )}
          <div className={style.tagBox}>
            <label htmlFor="DietTypes">Diet Types</label>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  {tag}
                  <i onClick={() => removeTag(index)}>
                    <Unicons.UilMultiply size="10" />
                  </i>
                </li>
              ))}
              <input
                onChange={handleChangeDiet}
                onKeyDown={handleKeyDown}
                type="text"
                name="DietTypes"
                list="DietTypes"
                placeholder="Ingrese tipo de dietas"
                id="dietInput"
                autoComplete="off"
                value={inputDieta}
                autoco
              />
              <datalist id="DietTypes">
                {dietTypes.map((diet, index) => (
                  <option key={index} value={diet.name}></option>
                ))}
              </datalist>
            </ul>
          </div>
          <label htmlFor="image">
            Health Score:{" "}
            <strong style={{ color: errors.healthScore ? "red" : "" }}>
              {recipeData.healthScore}
            </strong>
          </label>
          <input
            type="range"
            name="healthScore"
            min="0"
            max="100"
            value={recipeData.healthScore}
            onChange={handleChange}
          />
          {errors.healthScore && (
            <span className={style.error}>{errors.healthScore}</span>
          )}
          <hr
            style={{
              width: "100%",
              height: "1px",
            }}
          />
          <label
            htmlFor="steps"
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              margin: "5px 0px 20px 0px",
              fontWeight: "bold",
            }}>
            Instrucciones de preparación
          </label>
          {step.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}>
              <strong
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}>{`Step: ${item.number}`}</strong>
              <input
                style={{
                  flex: "1",
                  margin: "0 0 10px 10px",
                  maxWidth: "100%",
                  borderColor: errors.name ? "red" : "",
                }}
                type="text"
                value={item.step}
                onChange={(e) =>
                  handleChangeSteps(item.number - 1, e.target.value)
                }
              />
              {index === step.length - 1 && errors.steps && (
                <span className={style.error} style={{ marginLeft: "4rem" }}>
                  {errors.steps}
                </span>
              )}
            </div>
          ))}
          <div className={style.botonesStep}>
            <button
              className={style.botonAgregar}
              name="addStepButton"
              onClick={handleAddStep}
              style={{ flex: "1" }}
              disabled={
                step.length > 0 &&
                (!step[step.length - 1].step ||
                  step[step.length - 1].step.trim() === "")
              }>
              + Agregar paso
            </button>{" "}
            <button
              className={style.botonBorrar}
              name="removeStepButton"
              onClick={handleRemoveStep}
              disabled={step.length === 0}
              style={{ flex: "1" }}>
              - Borrar ultimo paso
            </button>
          </div>
          <hr
            style={{
              width: "100%",
              height: "1px",
            }}
          />
          <button
            className={style.botonEnviar}
            onClick={handleFormSubmit}
            disabled={
              Object.keys(recipeData).some((key) => recipeData[key] === "") ||
              Object.keys(errors).length > 0 ||
              step.some((item) => !item.step || item.step.trim() === "")
            }>
            enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
