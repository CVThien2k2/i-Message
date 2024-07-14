const { BadRequestError } = require("../utils/error.response");

const HEADER = {
  AUTHORIZATION: "authorization",
};
const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    throw new BadRequestError();
  }
  const objkey = await apikeyService.findById(key);
  if (!objkey) {
    throw new BadRequestError();
  }
  req.objkey = objkey;
  return next();
};

const permisstions = (permission) => {
  return (req, res, next) => {
    if (!req.objkey.permisstions) {
      throw new BadRequestError("Permisstion denied");
    }
    const validPermisstion = req.objkey.permisstions.includes(permission);
    if (!validPermisstion) {
      throw new BadRequestError("Permisstion denied");
    }
    return next();
  };
};

module.exports = { apiKey, permisstions };
