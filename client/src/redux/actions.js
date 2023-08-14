import {
  GET_ALL,
  DIET_TYPE_FILTER,
  GET_DIET_TYPE,
  ORDER,
  BY_NAME,
} from "./types";
import axios from "axios";
const URL_BASE = "http://localhost:3001";

export const getAllRecipes = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL_BASE}/recipes`);
    dispatch({ type: GET_ALL, payload: response.data });
  };
};

export function getRecipesByName(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_BASE}/recipes?name=${payload}`);
      console.log(response.data);
      return dispatch({ type: BY_NAME, payload: response.data });
    } catch {
      return alert("Recipe Not Found");
    }
  };
}

export const getDietTypes = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL_BASE}/diets`);
    dispatch({ type: GET_DIET_TYPE, payload: response.data });
  };
};

export const dietTypeFilter = (payload) => {
  return {
    type: DIET_TYPE_FILTER,
    payload,
  };
};

export const orderRecipes = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

// export const sourceRecipes = (source) => {
//   return {
//     type: SOURCE_FILTER,
//     payload: source
//   }
// }

export const sourceRecipes = (source) => {
  return async (dispatch) => {
    if (source === "All") {
      dispatch(getAllRecipes());
    } else {
      try {
        let response = await axios.get(`${URL_BASE}/recipes`);
        let filteredRecipes;

        if (source === "API") {
          filteredRecipes = response.data.filter((recipe) => !recipe.created);
        } else if (source === "DB") {
          filteredRecipes = response.data.filter((recipe) => recipe.created);
        }

        dispatch({ type: GET_ALL, payload: filteredRecipes });
      } catch (error) {
        console.error("Error al obtener las recetas:", error);
      }
    }
  };
};

export const addRecipe = (payload) => {
  return async function () {
    try {
      console.log(payload);
      const response = await axios.post(`${URL_BASE}/recipes`, payload);
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
};
