require("dotenv").config();
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
const data = require("../foodComplexSearch.json");
const instance = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});
const { Op } = require("sequelize");

const infoCleaner = (arr) =>
  arr.map((recipe) => {
    return {
      id: recipe.id,
      image: recipe.image,
      name: recipe.title,
      dietTypes: recipe.diets,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      steps: recipe.analyzedInstructions[0]?.steps.map((recipe) => {
        return {
          number: recipe.number,
          step: recipe.step,
        };
      }),
      created: false,
    };
  });

const getAllRecipes = async () => {
  try {
    const infoDATA = infoCleaner(data.results);
    const recipeDB = await Recipe.findAll({
      include: {
        model: Diets,
        as: "dietTypes",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // Transformación de los dietTypes en recipeDB
    const transformedRecipeDB = recipeDB.map((recipe) => ({
      ...recipe.toJSON(),
      dietTypes: recipe.dietTypes.map((diet) => diet.name),
    }));

    /* const infoAPI = (
      await instance(
        `/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      )
    ).data.results; */
    // const recipeAPI = infoCleaner(infoDATA);

    return [...transformedRecipeDB, ...infoDATA];
  } catch (error) {
    console.log("mira", error);
    // console.log("segundo", recipeDB);
    return [
      ["La API no esta funcionando, te enviamos solo los resultados de la DB"],
    ];
  }
};

const getRecipeByName = async (name) => {
  try {
    const recipeAPI = infoCleaner(data.results);
    const recipeFiltered = recipeAPI.filter(
      (recipe) =>
        recipe.name &&
        recipe.name.toLowerCase().includes(name.toString().toLowerCase())
    );
    const recipeDB = await Recipe.findAll({
      include: {
        model: Diets,
        as: "dietTypes",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    console.log(recipeDB);

    // Combinar los resultados de la API y la base de datos
    return [...recipeDB, ...recipeFiltered];
  } catch (error) {
    console.log("Error al buscar recetas por nombre:", error);
    return [];
  }
};

const getUserById = async (idReci, source) => {
  if (source === "api") {
    try {
      const infoAPI = (
        await instance(`/${idReci}/information?apiKey=${API_KEY}`)
      ).data;
      // const infoAPI = data.results.find((recipe) => recipe.id == idReci);
      // console.log(infoAPI);

      const recipeDetail = {
        image: infoAPI.image,
        name: infoAPI.title,
        dishTypes: infoAPI.dishTypes,
        dietTypes: infoAPI.diets,
        summary: infoAPI.summary,
        score: infoAPI.spoonacularScore,
        healthScore: infoAPI.healthScore,
        steps: infoAPI.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
      };

      return recipeDetail;
    } catch (error) {
      throw Error("La API esta caida");
    }
  } else {
    const recipe = await Recipe.findByPk(idReci, {
      include: {
        model: Diets,
        as: "dietTypes",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const dietNames = recipe.dietTypes.map((diet) => diet.name);

    // Creamos un nuevo objeto con las propiedades de la receta y el array de dietas
    const recipeDetail = {
      image: recipe.image,
      name: recipe.name,
      dishTypes: recipe.dishTypes,
      dietTypes: dietNames, // Aquí usamos el array de nombres de dietas
      summary: recipe.summary,
      score: recipe.score,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      created: recipe.created,
      // createdAt: recipe.createdAt,
      // updatedAt: recipe.updatedAt,
    };

    return recipeDetail;
  }
};

const createRecipeDB = async (
  name,
  summary,
  healthScore,
  image,
  steps,
  diets
) => {
  let recipeCreate = await Recipe.create({
    name,
    summary,
    healthScore,
    image,
    steps,
  });

  if (diets) {
    console.log(diets);
    // Buscar o crear el modelo Diets con el nombre de la dieta
    const dietModels = await Promise.all(
      diets.map((diet) => Diets.findOrCreate({ where: { name: diet } }))
    );
    // console.log(dietModels);
    // let dietDb = await Diets.findOrCreate({ where: { name: diet } });
    // // console.log(dietDb.length);
    await recipeCreate[`addDietTypes`](dietModels.map((model) => model[0]));

    // return "La receta se creo exitosamente";
  }
};

module.exports = {
  createRecipeDB,
  getUserById,
  getAllRecipes,
  getRecipeByName,
  infoCleaner,
};
