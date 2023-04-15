import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { before } from 'mocha';

chai.use(chaiHttp);
chai.should();

describe('ADMINS', () => {
  let token;
  let adminId;
  const user = {
    firstname: 'John',
    email: 'johnyves@gmail.com',
    password: 'password',
    lastname: 'Yves',
    phone: '0787882105',
    permissions: [],
  };
  before(async () => {
    await db.user.destroy({ where: { email: user.email } });
  });

  it('test ROOT (welcome to the server) endpoint', async () => {
    const res = await chai.request(app).get('/');
    res.statusCode.should.equal(200);
    res.body.should.have.property('message');
  });

  it('test none existing endpoint', async () => {
    const res = await chai.request(app).get('/non-existing-endpoint');
    res.statusCode.should.equal(404);
    res.body.should.have.property('error');
  });

  it('should create a new user', async () => {
    const res = await chai.request(app).post('/api/admin/users').send(user);
    adminId = res.body.data.id;
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('login user', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: user.email,
      password: user.password,
    });
    token = res.body.token;
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('role');
    res.body.should.have.property('token');
  });

  it('login user with invalid email', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'user.email',
      password: user.password,
    });
    res.statusCode.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });

  it('login user with invalid password', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: user.email,
      password: 'user.password',
    });
    res.statusCode.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });

  it('should return internal server error status code 500', async () => {
    const res = await chai.request(app).post('/api/admin/users').send({
      firstname: user.firstname,
    });
    res.statusCode.should.equal(500);
  });

  it('Getting all users without Authorization. it should return 403', async () => {
    const res = await chai.request(app).get('/api/admin/users');
    res.statusCode.should.equal(403);
  });

  it('Getting all users with Authorization. it should return 200', async () => {
    const res = await chai
      .request(app)
      .get('/api/admin/users')
      .set('Authorization', `bearer ${token}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
    res.body.should.have.property('data');
    res.body.data.should.be.a('array');
  });

  it('Getting a single user with Authorization. it should return 200', async () => {
    const res = await chai
      .request(app)
      .get(`/api/admin/users/${adminId}`)
      .set('Authorization', `bearer ${token}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('Getting a single user without Authorization. it should return 500', async () => {
    const res = await chai.request(app).get(`/api/admin/users/${adminId}`);
    res.statusCode.should.equal(403);
  });

  it('deleting a single user with Authorization. it should return 200', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/admin/users/${adminId}`)
      .set('Authorization', `bearer ${token}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
});
