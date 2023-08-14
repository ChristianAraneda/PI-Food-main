const { getAllRecipes } = require("../controllers/recipeControllers");
const data = require("../foodComplexSearch.json");
const { Diets } = require("../db");

const getDietsList = async () => {
  try {
    const allRecipes = await getAllRecipes();
    const dietsSet = new Set();
    const dataDB = await data.results;
    if (dataDB && Array.isArray(dataDB)) {
      dataDB.forEach((recipe) => {
        if (recipe.diets && Array.isArray(recipe.diets)) {
          recipe.diets.forEach((diet) => dietsSet.add(diet));
        }
      });
    }

    const dietsArray = Array.from(dietsSet);

    await Promise.all(
      dietsArray.map((diet) => Diets.findOrCreate({ where: { name: diet } }))
    );
    const dietTypes = await Diets.findAll();
    console.log(dietTypes);
    return dietTypes;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

module.exports = {
  getDietsList,
};
