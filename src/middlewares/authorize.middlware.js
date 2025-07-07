const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    next();
  };
};

module.exports = authorize;
