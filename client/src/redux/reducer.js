import {
  GET_ALL,
  DIET_TYPE_FILTER,
  GET_DIET_TYPE,
  ORDER,
  BY_NAME,
} from "./types";

const initialState = {
  recipes: [],
  auxRecipes: [],
  allRecipes: [],
  dietTypes: [],
  recipeDetails: [],
  selectedDietType: "All",
  originFilter: "All",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
      };

    case GET_DIET_TYPE: {
      return {
        ...state,
        dietTypes: payload,
      };
    }

    case BY_NAME:
      return {
        ...state,
        recipes: payload,
      };

    case DIET_TYPE_FILTER:
      const allRecipes = state.allRecipes;
      const filteredByDietType = allRecipes.filter((recipe) =>
        recipe.dietTypes?.some(
          (diet) => diet.toLowerCase() === payload.toLowerCase()
        )
      );
      return {
        ...state,
        selectedDietType: payload,
        filter: payload,
        recipes: payload === "All" ? state.allRecipes : filteredByDietType,
      };

    case ORDER:
      const recipeCopy = [...state.recipes];
      const sortedCharacters =
        payload === "A"
          ? recipeCopy.sort((a, b) => a.name > b.name)
          : recipeCopy.sort((a, b) => b.name > a.name);

      return {
        ...state,
        recipes: sortedCharacters,
      };

    /*   case SOURCE_FILTER:
      if (state.selectedDietType !== "All") {
        const allRecipesCopy = [...state.allRecipes];
        let filteredRecipes = allRecipesCopy;

        if (payload === "API") {
          filteredRecipes = allRecipesCopy.filter((recipe) => !recipe.created);
        } else if (payload === "DB") {
          filteredRecipes = allRecipesCopy.filter((recipe) => recipe.created);
        }
        return {
          ...state,
          originFilter: payload,
          recipes: filteredRecipes,
        };
      }

      const allRecipesCopy = [...state.allRecipes];
      let filteredRecipes = allRecipesCopy;

      if (payload === "API") {
        filteredRecipes = allRecipesCopy.filter((recipe) => !recipe.created);
      } else if (payload === "DB") {
        filteredRecipes = allRecipesCopy.filter((recipe) => recipe.created);
      }
      return {
        ...state,
        originFilter: payload,
        recipes: filteredRecipes,
      }; */

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
