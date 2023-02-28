import request from 'supertest';
import app from '../src/index.js';


describe('GET /', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /new-user', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/new-user')
      .send({
        email: 'test@test.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      });
    expect(response.statusCode).toBe(201);
  });
});
