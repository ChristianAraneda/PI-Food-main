const { getDietsList } = require("../controllers/dietsControllers");

const getDietsHandler = async (req, res) => {
  try {
    const respose = await getDietsList();
    res.status(200).json(respose);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getDietsHandler,
};
