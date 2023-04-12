import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { before } from 'mocha';
import { where } from 'sequelize';

chai.use(chaiHttp);
chai.should();

export let vendorId;
export let categoryId;
export let adminToken;
describe('VENDORS', () => {
  let token;
  let adminId;
  const user = {
    firstname: 'John',
    email: 'johnvendor@gmail.com',
    lastname: 'Yves',
    password: '12345678',
    phone: '0787882105',
    permissions: [],
  };

  before(async () => {
    await db.ProductImage.destroy({ where: {} });
    await db.ProductAttribute.destroy({ where: {} });
    await db.Product.destroy({ where: {} });
    await db.Category.destroy({ where: {} });
    await db.user.destroy({ where: {} });
  });

  it('should create a new Admin', async () => {
    const res = await chai.request(app).post('/api/admin/users').send({
      firstname: 'John',
      email: 'johnyves@gmail.com',
      password: 'password',
      lastname: 'Yves',
      phone: '0787882105',
      permissions: [],
    });
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('status');
  });

  it('login Admin to register vendor', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'johnyves@gmail.com',
      password: 'password',
    });
    adminToken = res.body.token;
    token = res.body.token;
    res.statusCode.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('role');
    res.body.should.have.property('token');
  });

  it('POST creating a vendor', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/vendors/register')
      .set('Authorization', `Bearer ${token}`)
      .send(user);
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    vendorId = res.body.data.id;
  });

  it('it should create new product category', async () => {
    const category = {
      name: 'clothes and jewellery',
      status: 'AVAILABLE',
    };
    const res = await chai
      .request(app)
      .post('/api/v1/category/add')
      .set('Authorization', `Bearer ${token}`)
      .send(category);
    res.statusCode.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    categoryId = res.body.data.id;
  });
});
