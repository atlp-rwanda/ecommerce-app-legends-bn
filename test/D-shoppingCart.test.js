import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { vendorId } from './B-vendor.test';
import { vendorToken, productAttributeId, productId } from './C-products.test';

describe('shopping cart based functionlaities', () => {
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
  it('should show the shopping cart', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/shoppingCart/view')
      .set('Authorization', `Bearer ${vendorToken}`);
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });
});
