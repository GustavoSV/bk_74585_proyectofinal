import { verifyToken } from "../helpers/token.util.js";

function isAuthenticated(req, res, next) {
  const { token } = req.signedCookies;
  
  try {
    if (!token) {
      req.user = null;
    } else {
      const dataToken = verifyToken(token);
      req.user = dataToken;
    }
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(401).json({ user: null });
  }
}

export { isAuthenticated };
