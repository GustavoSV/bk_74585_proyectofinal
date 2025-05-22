import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
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
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
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
  // nombre de la estrategia
  "login",
  // constructor de la estrategia
  new LocalStrategy(
    // objeto de configuración de la estrategia
    { passReqToCallback: true, usernameField: "email" },
    // callback de la lógica de la estrategia
    async (req, email, password, done) => {
      try {
        // validar si el usuario ya fue registrado
        let user = await usersManager.readBy({ email });
        if (!user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        // validar si la constraseña es correcta
        const validar = compareHash(password, user?.password);
        if (!validar) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
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

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await usersManager.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

export default passport;
