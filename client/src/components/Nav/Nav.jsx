import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dietTypeFilter,
  getDietTypes,
  orderRecipes,
  sourceRecipes,
  getRecipesByName,
} from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

export default function Nav() {
  const dietTypes = useSelector((state) => state.dietTypes);
  const selectedDietType = useSelector((state) => state.selectedDietType);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDietTypes());
  }, []);

  const [aux, setAux] = useState("A");
  const [aux2, setAux2] = useState(true);

  const handleOrder = (event) => {
    dispatch(orderRecipes(event.target.value));
    setAux(event.target.value);
  };

  useEffect(() => {
    dispatch(orderRecipes(aux));
  }, [aux2]);

  useEffect(() => {
    setAux2(!aux2);
  }, [dietTypes, selectedDietType]);

  const handleFilter = (event) => {
    const selectedValue = event.target.value;
    dispatch(dietTypeFilter(selectedValue));
    setAux2(!aux2);
  };

  const handleSource = (event) => {
    const sourceValue = event.target.value;
    dispatch(sourceRecipes(sourceValue));
  };

  // INPUT SEARCH

  const [input, setInput] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    try {
      dispatch(getRecipesByName(input));
    } catch (error) {
      return error;
    }

    setInput("");
  }

  return (
    <div className={style.navContainer}>
      <NavLink
        exact
        to="/home"
        activeClassName={style.activeLink}
        className={style.navLink}>
        Home
      </NavLink>
      <NavLink
        to="/form"
        activeClassName={style.activeLink}
        className={style.navLink}>
        Agregar Receta
      </NavLink>
      <input
        type="text"
        className={style.navInput}
        value={input}
        onChange={handleChange}
      />
      <button className={style.navButton} onClick={handleSubmit}>
        Buscar
      </button>
      <select
        onChange={handleOrder}
        defaultValue={"A"}
        className={style.navSelect}>
        <option value="FuenteInfo" disabled>
          --Orden--
        </option>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select
        onChange={handleFilter}
        value={selectedDietType}
        className={style.navSelect}>
        <option value="TipoDietas" disabled selected>
          --Tipo de Dieta--
        </option>
        <option value="All">Todas las dietas</option>
        {dietTypes.map((diet) => (
          <option key={diet.id} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
      <select className={style.navSelect} onChange={handleSource}>
        <option value="FuenteInfo" disabled>
          --Fuente INFO--
        </option>
        <option value="All" selected>
          API / DB
        </option>
        <option value="API">SOLO API</option>
        <option value="DB">SOLO DB</option>
      </select>
    </div>
  );
}
