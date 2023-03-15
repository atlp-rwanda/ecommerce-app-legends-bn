import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { signToken } from '../utils/verifyPassword';

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URI,
}, async (accessToken, refreshToken, profile, done) => {
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
