import express from 'express';
import passport from '../middlewares/auth/google_auth';
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/auth/google/redirect', passport.authenticate('google', { session: false, failureRedirect: `https://localhost:3000/login` }), (req, res) => {
  res.redirect('http://localhost:5000/'); 
});

export default router;
