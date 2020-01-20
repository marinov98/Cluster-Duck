import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../../db/models";
import config from "./config";

// show the strategy the token and how to decode it
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwtToken"),
  secretOrKey: config.jwt_secret
};

export default function executeStrategy(passport) {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        // find an existing user
        const user = await User.findById(payload.id);

        if (!user) done(null, false);
        else done(null, user);
      } catch (err) {
        done(err);
      }
    })
  );
}
