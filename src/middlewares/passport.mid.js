import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usersManager } from "../data/manager.mongo.js";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { createToken } from "../helpers/token.util.js";

// es MUY IMPORTANTE que la variable se llame EXACTAMENTE 'callbackURL' de lo contrario produce error
const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
  /* nombre de la estrategia */
  "register",
  /* constructor de la estrategia*/
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la logica de la estrategia */
    async (req, email, password, done) => {
      try {
        let user = await usersManager.readBy({ email });
        if (user) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        req.body.password = createHash(password);
        user = await usersManager.createOne(req.body);
        /* gracias a este done, se agregan los datos del usuario */
        /* al objeto de requerimientos (req.user) */
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("passport-google profile:", profile);
        const { email, name, picture, id } = profile;
        let user = await usersManager.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
          user = await usersManager.createOne(user);
        }
        const data = {
          _id: user._id,
          role: user.role,
          email,
        };
        user.token = createToken(data);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await usersManager.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }

        const validar = compareHash(password, user?.password);
        if (!validar) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const data = {
          _id: user._id,
          role: user.role,
          email,
        };
        user.token = createToken(data);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "userJWT",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.signedCookies?.token]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await usersManager.readBy({ _id, role, email });
        if (!user) {
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "adminJWT",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.signedCookies?.token]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await usersManager.readBy({ _id, role, email });
        if (!user || user?.role !== "ADMIN") {
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
