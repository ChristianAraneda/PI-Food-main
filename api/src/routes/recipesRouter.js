const express = require("express");
const {
  getRecipeDetailHandler,
  getRecipeByNameHandler,
  getAllRecipeHandler,
  postNewRecipeHandler,
} = require("../handlers/recipeHandler");

const recipesRouter = express.Router();

recipesRouter.get("/:idReci", getRecipeDetailHandler);
recipesRouter.get("/", getRecipeByNameHandler);
// recipesRouter.get("/all", getAllRecipeHandler);
recipesRouter.post("/", postNewRecipeHandler);

module.exports = recipesRouter;
