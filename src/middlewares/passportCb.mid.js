import passport from "./passport.mid.js";

const passportCb = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, (error, user, info) => {
    try {
      if (error) throw error;
      if (!user) {
        const errCb = new Error(info?.message || "Bad auth");
        errCb.statusCode = info?.statusCode || 401;
        throw errCb;
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export default passportCb;