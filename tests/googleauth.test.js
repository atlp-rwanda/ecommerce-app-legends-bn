
import request from 'supertest';
import app from '../src/index.js';

describe('Google auth routes', () => {
  it('should redirect to google authentication page', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/^https:\/\/accounts\.google\.com/);
  });

  it('should redirect to success page if user exists', async () => {
    const res = await request(app).get('/auth/google/redirect');
    expect(res.status).toBe(302);
  });

  it('should redirect to error page if user does not exist', async () => {
    jest.mock('../src/models', () => ({
      User: {
        findOne: () => null,
      },
    }));

    const res = await request(app).get('/auth/google/redirect');
    expect(res.status).toBe(302);
  });
});


