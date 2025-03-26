import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "config";
import { userModel } from "../../../database/models/user.model.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("credential.GOOGLE_CLIENT_ID"),
      clientSecret: config.get("credential.GOOGLE_CLIENT_SECRET"),
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, displayName } = profile;
        const email = emails && emails[0] ? emails[0].value : null;
        const googleId = id;
        let userGID = await userModel.findOne({ googleId });
        let userEmail = await userModel.findOne({ email: emails[0].value });
        if (userEmail && userEmail.provider === "email") {
          return done(null, false, {
            message:
              "User already exists with this email. Cannot log in with Google.",
          });
        }
        if (!userGID && !userEmail) {
          let newUser = new userModel({
            googleId,
            email,
            firstName: displayName.split(" ")[0],
            lastName: displayName.split(" ")[1],
            isVerified: true,
            provider: "google",
          });
          await newUser.save();
          const token = newUser.generateAuthToken();

          console.log("New user created:", newUser);
          return done(null, newUser, token);
        }
        if (userGID && userGID.AdministrativeStatus === "restrict") {
          return done(null, false, {
            message: "Your account has been restricted. Please contact us.",
          });
        }
        if (userGID && userGID.provider === "google") {
          return done(null, userGID, userGID.generateAuthToken());
        }
        console.log(token);
        console.log("User already exists. You cannot log wiht google account");
        console.log(profile);
        return done(null, false, {
          message: "User already exists. You cannot log wiht google account",
        });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user, token, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(
          "User already exists. You cannot log wiht google account"
        );
      }

      req.logIn(user, token, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect(`http://localhost:4200/auth-success?token=${token}`);

      });
    }
  )(req, res, next);
};

const logout = (req, res) => {
  req.logout(() => {
    res.send("User logged out successfully");
  });
};

export { googleAuth, googleCallback, logout };
