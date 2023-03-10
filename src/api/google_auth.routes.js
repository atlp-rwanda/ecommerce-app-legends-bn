import express from 'express';
import passport from 'passport';

const router = express.Router();
import '../middlewares/auth/google_auth';

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/auth/google/redirect', passport.authenticate('google', { session: false, failureRedirect: `https://localhost:3000/login` }), (req, res) => {
  res.redirect(req.user); 
});

export default router;
