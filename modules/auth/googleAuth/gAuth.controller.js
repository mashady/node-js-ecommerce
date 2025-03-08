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
        const email = emails?.[0]?.value || null;
        const googleId = id;

        let userGID = await userModel.findOne({ googleId });
        let userEmail = await userModel.findOne({ email });

        if (userEmail && userEmail.provider === "email") {
          return done(null, false, {
            message:
              "This email is already registered. Please use your email & password to log in.",
          });
        }

        if (!userGID && !userEmail) {
          let newUser = new userModel({
            googleId,
            email,
            firstName: displayName.split(" ")[0] || "",
            lastName: displayName.split(" ")[1] || "",
            isVerified: true,
            provider: "google",
          });
          await newUser.save();
          return done(null, newUser, newUser.generateAuthToken());
        }

        if (userGID && userGID.AdministrativeStatus === "restrict") {
          return done(null, false, {
            message:
              "Your account has been restricted. Please contact support for further assistance.",
          });
        }

        return done(null, userGID, userGID.generateAuthToken());
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
        return res.status(403).json({
          success: false,
          message: info?.message || "Authentication failed, please contact us.",
        });
      }

      req.logIn(user, token, (err) => {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          message: "User logged in successfully",
          token: token,
        });
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
