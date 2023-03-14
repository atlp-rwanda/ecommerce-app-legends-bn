import request from 'supertest';
import app from '../src/index.js';
import passport from 'passport';

describe('Google Authentication', () => {
  it('should redirect to Google login page', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toEqual(302);
    expect(res.header['location']).toContain('https://accounts.google.com/o/oauth2/v2/auth');
  });

  it('should redirect to the home page after successful authentication', async () => {
    const user = { id: 123, name: 'John Doe', email: 'john@example.com' };
    const done = jest.fn().mockImplementation((_, redirectUrl) => redirectUrl(null, user));
  
    jest.spyOn(passport, 'authenticate').mockImplementation((strategy, options, callback) => {
      callback(null, done);
    });
  
    const res = await request(app).get('/auth/google/redirect');
    expect(res.statusCode).toEqual(302);
  });
  
});
