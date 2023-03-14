import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { signToken } from '../utils/verfyPassword';

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URI,
}, async (accessToken, refreshToken, profile, done) => {
  // Use the `profile` object to authenticate the user with your database
  // and retrieve their user information.
  // Once authenticated, create a JWT token and pass it to the `done` callback.
  try {
    const user = { id: profile.id, email: profile.emails[0].value };
    const token = await signToken(user);
    done(null, { user, token });
  } catch (err) {
    done(err, null);
  }
}));

export const googleAuthMiddleware = passport.authenticate('google', { scope: ['email'] });

export const googleAuthCallbackMiddleware = passport.authenticate('google', { session: false });
