import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import img from "../../Images/cooking.png";
import { useEffect } from "react";
import { getAllRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  return (
    <div className={style.landingContainer}>
      <div className={style.landingContent}>
        <div className={style.contentBox}>
          <h1 className={style.heading}>
            ¡Bienvenido a Tu Aplicación de Recetas!
          </h1>
          <p className={style.subheading}>
            Explora una variedad de deliciosas recetas y encuentra la
            inspiración que necesitas en la cocina.
          </p>
          <Link to="/home" className={style.button}>
            Ingresar
          </Link>
        </div>
      </div>
      <div className={style.imageBox}>
        <img src={img} alt="Cocinando" className={style.image} />
      </div>
    </div>
  );
}
