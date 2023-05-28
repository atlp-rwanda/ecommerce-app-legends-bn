import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { signToken } from '../utils/verifyPassword';
import db from '../database/models';
import { hashPassword } from '../utils/hashpassword';
import login from '../docs/login';
// Generate a random password
const generatePassword = () => {
  const length = 8;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = { id: profile.id, email: profile.emails[0].value };
        const existingUser = await db.user.findOne({
          where: { email: user.email },
        });
        if (existingUser) {
          const userRole = await db.role.findOne({
            where: { id: existingUser.roleId },
          });
          const userId = await db.user.findOne({
            where: { email: user.email },
          });
          user.role = userRole.name;
          user.id = userId.id;
          user.firstname = userId.firstname;
          user.lastname = userId.lastname;
          console.log('===============', user);
          const token = await signToken(user);
          done(null, { user, token });
        } else {
          let buyer = await db.role.findOne({ where: { name: 'buyer' } });
          if (!buyer) {
            buyer = await db.role.create({
              name: 'buyer',
            });
          }

          const password = generatePassword();
          const hashedPassword = await hashPassword(password);
          const newUser = await db.user.create({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            password: hashedPassword,
            phone: '',
            roleId: buyer.id,
          });

          const userRole = await db.role.findOne({
            where: { id: newUser.roleId },
          });
          const userId = await db.user.findOne({
            where: { email: newUser.email },
          });
          newUser.role = userRole.name;
          newUser.id = userId.id;
          newUser.firstname = userId.firstname;
          newUser.lastname = userId.lastname;
          const token = await signToken(newUser);
          done(null, { user: newUser, token });
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export const googleAuthMiddleware = passport.authenticate('google', {
  scope: ['email', 'profile'],
});
export const googleAuthCallbackMiddleware = passport.authenticate('google', {
  session: false,
});
