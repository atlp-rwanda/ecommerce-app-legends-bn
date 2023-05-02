import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import fs from 'fs';
import path from 'path';
import { vendorId, categoryId } from './B-vendor.test';
chai.use(chaiHttp);
chai.should();
export let vendorToken;
export let productAttributeId;
export let productId;
export let productVarId;
describe('products based functionalities', () => {
  const vendor = {
    email: 'johnvendor@gmail.com',
    password: '12345678',
  };

  it('it should log a vendor in to perform product based functionalities', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: vendor.email,
      password: vendor.password,
    });
    vendorToken = res.body.token;
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('role');
    res.body.should.have.property('token');
  });
  it('should not create a new product images', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/product/images/add`)
      .set('Authorization', `Bearer ${vendorToken}`)
      .attach(
        'prodImage',
        fs.readFileSync(path.join(__dirname, 'image.jpg')),
        'image.jpg'
      )
      .field('productId', 'ac161437-1771-40d0-ac3c-822beb390247')
      .field('status', 'AVAILABLE')
      .field('cloudinaryId', 'a364fw374yvsiqhss88');
    res.should.have.status(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
  });

  it('it should list every product from database to the clients', async () => {
    const res = await chai.request(app).get('/api/v1/buyer/products');
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('data');
  });

  it('it should list all product  of authorized particular vendor from database to that vendor', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/seller/products')
      .set('Authorization', `Bearer ${vendorToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('data');
  });
});
