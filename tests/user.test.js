import request from 'supertest';
import app from '../src/index.js';


describe('GET /', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});


describe('POST new user', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users/add')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'doe@gmail.com',
      });
    expect(response.statusCode).toBe(201);
  });
});



describe('GET all users', () => {
  it('should get a all users', async () => {
    const response = await request(app)
      .get('/api/users/all');
    expect(response.statusCode).toBe(200);
  });
}); 