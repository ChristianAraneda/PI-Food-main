const {
  createRecipeDB,
  getUserById,
  getAllRecipes,
  getRecipeByName,
} = require("../controllers/recipeControllers");

const getRecipeDetailHandler = async (req, res) => {
  const { idReci } = req.query;
  const source = isNaN(idReci) ? "db" : "api";
  try {
    const response = await getUserById(idReci, source);
    if (response === null)
      throw Error("No se encontro el personaje en la base de datos");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getRecipeByNameHandler = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    if (name) {
      const recipeByName = await getRecipeByName(name);
      res.status(200).json(recipeByName);
    } else {
      const response = await getAllRecipes();
      res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

/* const getAllRecipeHandler = async (req, res) => {
  try {
    const response = getAllRecipes();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}; */

const postNewRecipeHandler = async (req, res) => {
  const { name, summary, healthScore, image, steps, diets } = req.body;
  console.log(req.body);

  try {
    const response = await createRecipeDB(
      name,
      summary,
      healthScore,
      image,
      steps,
      diets
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipeDetailHandler,
  getRecipeByNameHandler,
  postNewRecipeHandler,
};
