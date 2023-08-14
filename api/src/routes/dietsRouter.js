const express = require("express");

const { getDietsHandler } = require("../handlers/dietsHandler");
const dietsRouter = express.Router();

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
