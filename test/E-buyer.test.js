import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { vendorId } from './B-vendor.test';
import { adminToken } from './B-vendor.test';
import { vendorToken, productAttributeId, productId } from './C-products.test';

chai.use(chaiHttp);
chai.should();

export let buyerToken;
describe('BUYERS based functionlaities', () => {
  let emailToken;
  let buyerId;
  const user = {
    firstname: 'John',
    email: 'johnbuyer@gmail.com',
    password: 'password',
    lastname: 'Yves',
    phone: '0787882105',
    permissions: [],
  };
  it('should register a buyer in Database', async () => {
    const res = await chai.request(app).post('/api/v1/register').send(user);
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
    buyerId = res.body.data.id;
    buyerToken = res.body.token;
  });

  it('trying to register a user which is already eist in database', async () => {
    const res = await chai.request(app).post('/api/v1/register').send(user);
    res.statusCode.should.equal(409);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });


  it('Should view recommended products', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/products/view/recommendations')
      .set('Authorization', `bearer ${buyerToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('data');
  });

  it('Should update a user', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/users')
      .set('Authorization', `bearer ${buyerToken}`)
      .send(user);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });

  it('Should update a user with modefied token', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/users')
      .set('Authorization', `bearer ${buyerToken}e`)
      .send(user);
    res.statusCode.should.equal(401);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });
  it('Should update a user Password', async () => {
    const res = await chai
      .request(app)
      .put('/api/v1/users/password/update')
      .set('Authorization', `bearer ${buyerToken}`)
      .send({
        existingPassword: 'password',
        newPassword: 'pass',
      });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });
  it('A user should verify email to be able to reset Password', async () => {
    const res = await chai.request(app).post('/api/v1/email').send({
      email: 'johnbuyer@gmail.com',
    });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('token');
    emailToken = res.body.token;
  });
  it('A user should be able to reset password after email verification', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/password/${emailToken}`)
      .send({
        password: 'password',
      });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });

  it('deleting a Buyer user', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/admin/users/${buyerId}`)
      .set('Authorization', `bearer ${adminToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('deleting a Vendor user', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/admin/users/${vendorId}`)
      .set('Authorization', `bearer ${adminToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
});
