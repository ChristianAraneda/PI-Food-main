import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { dietTypeFilter } from "../../redux/actions";
import { NavLink } from "react-router-dom";

export default function Card({ id, name, image, dietTypes }) {
  const dispatch = useDispatch();

  const handleDietTypeClick = (dietType) => {
    dispatch(dietTypeFilter(dietType));
  };

  return (
    <>
      <div id={id} key={id} className={style.card}>
        <NavLink to={`/detail/${id}`}>
          <img src={image} alt="" className={style.image} />
          <h1 className={style.h1}>{name}</h1>
        </NavLink>
        <div className={style.tagCont}>
          <h2 className={style.h2}>
            {dietTypes.map((diet, index) => (
              <span
                key={index}
                className={style.dietType}
                onClick={() => handleDietTypeClick(diet)}>
                {diet}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </>
  );
}
