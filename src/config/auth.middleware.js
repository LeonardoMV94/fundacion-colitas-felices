const isHaveToken = (req, res, next) => {
  next();
};

const isAdminRol = (req, res, next) => {
  next();
};

export {
  isHaveToken,
  isAdminRol
}