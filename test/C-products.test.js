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

  it('should create new product in database', async () => {
    const product = {
      name: 'shoes',
      slug: 'shoes',
      description: 'made in Rwanda',
      model: 'air max',
      keyword: 'new product',
      status: 'AVAILABLE',
      categoryId: categoryId,
      userId: vendorId,
      expiredAt: '12-02-2024',
    };
    const res = await chai
      .request(app)
      .post('/api/v1/products/add')
      .set('Authorization', `Bearer ${vendorToken}`)
      .attach(
        'image',
        fs.readFileSync(path.join(__dirname, 'image.jpg')),
        'image.jpg'
      )
      .field('name', 'shoe')
      .field('categoryId', product.categoryId)
      .field('description', product.description)
      .field('status', product.status)
      .field('userId', product.userId)
      .field('model', product.model)
      .field('keyword', product.keyword)
      .field('slug', product.slug)
      .field('expiresAt', product.expiredAt)
      .field('cloudinaryId', 'a364fw374yvsiqhss88');
    res.should.have.status(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('data');
    productId = res.body.data.id;
  });
  it('it should update product', async () => {
    const product = {
      name: 'shoes',
      slug: 'shoes',
      description: 'made in Rwanda',
      model: 'air max',
      keyword: 'new product',
      status: 'AVAILABLE',
      categoryId: categoryId,
      userId: vendorId,
      expiredAt: '12-02-2024',
    };
    const res = await chai
      .request(app)
      .put(`/api/v1/products/update/${productId}`)
      .set('Authorization', `Bearer ${vendorToken}`)
      .attach(
        'image',
        fs.readFileSync(path.join(__dirname, 'image.jpg')),
        'image.jpg'
      )
      .field('name', 't-shirt')
      .field('categoryId', product.categoryId)
      .field('description', product.description)
      .field('status', 'UNAVAILABLE')
      .field('userId', product.userId)
      .field('model', product.model)
      .field('keyword', product.keyword)
      .field('slug', product.slug)
      .field('expiresAt', product.expiredAt)
      .field('cloudinaryId', 'a364fw374yvsiqhss88');
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('data');
  });

  it('should return a single product', async () => {
    const res = await chai.request(app).get(`/api/v1/products/${productId}`);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('data');
  });

  it('should not get a single product', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/products/ac161437-1771-40d0-ac3c-822beb390247`);
    res.should.have.status(404);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
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

  it('should add new product variation', async () => {
    const product = {
      model: 'air max',
    };
    const res = await chai
      .request(app)
      .post('/api/v1/product/variation/add')
      .set('Authorization', `Bearer ${vendorToken}`)
      .attach(
        'attrImage',
        fs.readFileSync(path.join(__dirname, 'image.jpg')),
        'image.jpg'
      )
      .field('price', 5000)
      .field('size', 'large')
      .field('color', 'blue')
      .field('status', 'AVAILABLE')
      .field('productId', productId)
      .field('model', product.model)
      .field('quantity', 7)
      .field('cloudinaryId', 'a364fw374yvsiqhss88');
    res.should.have.status(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('data');
    productAttributeId = res.body.data.id;
    console.log(productAttributeId, 'qwertyuiobn');
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
  it('User should be able to view a single product', async () => {
    const res = await chai.request(app).get(`/api/v1/products/${productId}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('data');
  });
  // it('View recommended products with no wishlist', async () => {
  //   const res = await chai
  //     .request(app)
  //     .get('/api/v1/products/view/recommendations')
  //     .set('Authorization', `bearer ${vendorToken}`)
  //   res.statusCode.should.equal(200);
  //   res.body.should.be.a('object');
  //   res.body.should.have.property('data');
  //   res.body.should.have.property('status');
  // });
});
