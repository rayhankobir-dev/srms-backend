const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden Access denied" });
    }

    next();
  };
};

module.exports = authorize;
