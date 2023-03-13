import request from 'supertest';
import app from '../src/index.js';
import { User } from '../src/models';


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

describe('POST new user', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .get('/api/users/all');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST Buyer register', () => {
  it('should create a return 409', async () => {
  
    const user = await User.create({firstname: 'John', lastname: 'Doe', phone: "12345678", email: 'doe@gmail.com', password: '12345678'});
    const response = await request(app)
      .post('/api/v1/register')
      .send({firstname: 'John', lastname: 'Doe', phone: "1234", email: 'doe@gmail.com', password: '123456'});
    expect(response.statusCode).toBe(409);
  });
});


// User 
describe('POST Buyer register return 201', () => {

  it('should create a return 201', async () => {
    await User.destroy({where: {}});
  const response = await request(app)
  .post('/api/v1/register')
  .send({firstname: 'John', lastname: 'Doe', phone: "1234", email: 'doe1@gmail.com', password: '123456'});
  expect(response.statusCode).toBe(201);
  });
});

describe('POST Buyer register', () => {
  it('should create a return 400', async () => {
    const response = await request(app)
      .post('/api/v1/register');
    expect(response.statusCode).toBe(400);
  });
});


