const error500 = (res) => {
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

const error400 = (res, msg) => {
  return res.status(400).json({ success: false, message: msg });
};
const error401 = (res) => {
  return res
    .status(401)
    .json({ success: false, message: "Access token not found" });
};

const error403 = (res) => {
  return res.status(401).json({ success: false, message: "Invalid Token" });
};

module.exports = {
  error500,
  error400,
  error401,
  error403
};
