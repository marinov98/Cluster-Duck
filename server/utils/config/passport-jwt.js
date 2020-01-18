import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../../db/models";
import config from "./config";

// show the strategy the token and how to decode it
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwtToken"),
  secretOrKey: config.jwt_secret
};

export function executeStrategy(passport) {
  try {
    passport.use(
      new Strategy(options, async (payload, done) => {
        // find an existing user
        const user = await User.findById(payload.id);

        if (!user) return done(null, false);
        // return user if validation goes through
        return done(null, user);
      })
    );
  } catch (err) {
    console.error(err);
  }
}
