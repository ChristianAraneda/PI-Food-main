import style from "./Detail.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";

const Detail = () => {
  const navegate = useNavigate();
  let { id } = useParams();

  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/recipes/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setRecipes(data);
        } else {
          console.log("No hay personajes con ese ID");
        }
      })
      .catch((error) => console.log(error.message));
    return setRecipes({});
  }, [id]);

  console.log(recipes);

  return (
    <div className={style.mainCont}>
      <Nav></Nav>
      <div className={style.cardCont}>
        <div>
          <img src={recipes.image} alt="" />
          <h3>ID: {id}</h3>
          <h2 className={style.h2}>
            Diet Type:
            {recipes.dietTypes?.map((diet, index) => (
              <span key={index} className={style.dietType}>
                {diet}
              </span>
            ))}
          </h2>
          <span>Health Score: {recipes.healthScore}</span>
        </div>
        <div style={{ position: "relative" }}>
          <button
            className={style.closeButton}
            onClick={() => navegate("/home")}>
            ✖
          </button>
          <h1>{recipes.name}</h1>

          <span>
            <p dangerouslySetInnerHTML={{ __html: recipes.summary }}></p>
          </span>
        </div>
      </div>
      {recipes.steps && (
        <div className={style.cardCont2}>
          <details>
            <summary>INSTRUCCIONES DE PREPARACION: </summary>
            {recipes.steps?.map((e) => (
              <details>
                <summary>Paso: {e.number}</summary>
                <p>{e.step}</p>
              </details>
            ))}
          </details>
        </div>
      )}
    </div>
  );
};

export default Detail;
