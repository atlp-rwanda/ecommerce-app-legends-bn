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
    jest.setTimeout(10000); // Set the timeout to 10 seconds
    const response = await request(app)
      .post('/api/user/post')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'Doe',
      });
    expect(response.statusCode).toBe(201);
  });
});
