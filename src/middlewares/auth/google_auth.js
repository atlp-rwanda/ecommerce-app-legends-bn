import dotenv from "dotenv";
import { User } from "../../models";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; 
import  jwt from 'jsonwebtoken';

dotenv.config();

passport.use(new GoogleStrategy({
  callbackURL: process.env.REDIRECT_URI,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
},
async (accessToken, refreshToken, profile, done) => {
  try {  
    let user_email = profile.emails && profile.emails[0].value; 
    let user = await User.findOne({ where: { email: user_email } });
    let redirect_url = "";
  
    if (user) {
      const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      redirect_url = `http://localhost:5000/`;
      return done(null, redirect_url);
    } else {
      redirect_url = `http://localhost:5000/api/`;
      return done(null, redirect_url);
    }
  } catch (error) {
    done(error)
  }
}));

export default passport;
