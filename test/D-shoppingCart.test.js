import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { vendorId } from './B-vendor.test';
import { vendorToken, productAttributeId, productId } from './C-products.test';

export let shoppingCardId;
describe('shopping cart based functionlaities', () => {
  let cartId;
  chai.use(chaiHttp);
  chai.should();
  it('should add products to the shopping cart', async () => {
    console.log('productAttributeId', productAttributeId);
    const res = await chai
      .request(app)
      .post('/api/v1/shoppingCart/add')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        buyer: vendorId,
        productId: `${productAttributeId}`,
      });
    console.log(res.body);
    shoppingCardId = res.body.data.cart[0].id;
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('should show the shopping cart', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/shoppingCart/view')
      .set('Authorization', `Bearer ${vendorToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
    cartId = res.body.data.cart[0].id;
  });
  it('should update products on the shopping cart', async () => {
    // console.log("##############################################################################################################\
    // ########################################################################################33",cartId);
    const carts = await chai
      .request(app)
      .get('/api/v1/shoppingCart/view')
      .set('Authorization', `Bearer ${vendorToken}`);

    console.log(carts.body.data.cart);

    const res = await chai
      .request(app)
      .patch('/api/v1/shoppingCart/update')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        id: carts.body.data.cart[-1].id,
        quantity: 2,
      });
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('should delete specific item on the shopping cart', async () => {
    console.log('productAttributeId', productAttributeId);
    const res = await chai
      .request(app)
      .delete('/api/v1/shoppingCart/delete')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        id: shoppingCardId,
      });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('should add products to cart second time because it was deleted', async () => {
    console.log('productAttributeId', productAttributeId);
    const res = await chai
      .request(app)
      .post('/api/v1/shoppingCart/add')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        buyer: vendorId,
        productId: `${productAttributeId}`,
      });
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('should clear the cart', async () => {
    console.log('productAttributeId', productAttributeId);
    const res = await chai
      .request(app)
      .delete('/api/v1/shoppingCart/clear')
      .set('Authorization', `Bearer ${vendorToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('should add products to cart third time because it was deleted', async () => {
    console.log('productAttributeId', productAttributeId);
    const res = await chai
      .request(app)
      .post('/api/v1/shoppingCart/add')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        buyer: vendorId,
        productId: `${productAttributeId}`,
      });
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('should not  add product with unknown attribute to the shopping cart', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/shoppingCart/add')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        buyer: vendorId,
        productId: 2899,
      });
    res.statusCode.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('A buyer proceeding with checkout', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/checkout')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        location: 'rwanda',
      });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
  it('A buyer proceeding with paying', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/checkout/payment')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        cardNumber: '4242424242424242',
        exp_month: 12,
        exp_year: 2024,
        cvcNumber: '123',
        currency: 'rwf',
      });
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
});
