const check =
  (...roles) =>
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      return res.status(401).send("Unauthorized, loggin first!");
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
      return res.status(403).send("You are not allowed to make this request.");
    }

    return next();
  };

const role = { check };
export default role;
