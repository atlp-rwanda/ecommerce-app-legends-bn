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
    console.log(buyerToken, 'buyerToken');
  });

  it('trying to register a user which is already eist in database', async () => {
    const res = await chai.request(app).post('/api/v1/register').send(user);
    res.statusCode.should.equal(409);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
// ========================Enabling and Disabling a user========================//
  
  it('Should disable a user', async () => { 
    const res = await chai
      .request(app)
      .patch(`/api/v1/users/${biyerId}/enable`)
      .set('Authorization', `bearer ${adminToken}`)
      .send({ email: `${user.email}` });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  })
  
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

  it('Should add product to wishList', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/product/wishList')
      .set('Authorization', `bearer ${buyerToken}`)
      .send({ productId: `${productAttributeId}` });
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });

    it('Should add product to wishList', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/product/wishList')
        .set('Authorization', `bearer ${buyerToken}`)
        .send({ productId: `${productAttributeId}` });
      res.statusCode.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('status');
    });

  // it('Should view products from wishList', async () => {
  //   const res = await chai
  //     .request(app)
  //     .get('/api/v1/product/wishList')
  //     .set('Authorization', `bearer ${buyerToken}`)
  //     .send({ productId: `${productAttributeId}` });
  //   res.statusCode.should.equal(404);
  //   res.body.should.be.a('object');
  //   res.body.should.have.property('status');
  //   res.body.should.have.property('data');
  // });

  //   it('Should view unexisting products from wishList', async () => {
  //     const res = await chai
  //       .request(app)
  //       .get('/api/v1/product/wishList')
  //       .set('Authorization', `bearer ${buyerToken}`)
  //       .send({ productId: `1234587654` });
  //     res.statusCode.should.equal(200);
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('status');
  //     res.body.should.have.property('data');
  //   });

  it('Should update a user', async () => {
    console.log(buyerToken, 'buyerToken');
    const res = await chai
      .request(app)
      .put('/api/v1/users')
      .set('Authorization', `bearer ${buyerToken}`)
      .send(user);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  })

    it('Should update a user with modefied token', async () => {
      console.log(buyerToken, 'buyerToken');
      const res = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `bearer ${buyerToken}e`)
        .send(user);
      res.statusCode.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message');
    });

  //   this delete product test should be at the end of all test cases
  it('should delete a product by product owner', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/products/delete/${productId}`)
      .set('Authorization', `bearer ${vendorToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
  });
});
