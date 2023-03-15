import request from 'supertest';
import app from '../src/index.js';
import {user ,role } from '../src/models';

describe('GET /', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

//admin endpoints
describe('admin tests', () => {
  let idAdmin;
  let token;
  let idvendor
  test('adding a real admin', async () => {
    await request(app)
      .post('/api/admin/users')
      .send({
        firstname: 'joeyb',
        lastname: 'idowa',
        email: 'hassomeon@bff.com',
        password: 'pasmegaround',
        phone: '0787882105',
        permissions: [],
      })
      .expect(function (res) {
        return expect(res.status).toBe(201);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  });
  test('adding a malformed admin with no Authorization', async () => {
    await request(app)
      .post('/api/admin/users')
      .send({
        firstname: 'joeyb',
        lastname: 'idowa',
        email: 'hassomeon@bff.com',
      })
      .expect(function (res) {
        return expect(res.status).toBe(500);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  });

  test('logging in as admin with no Authorization', async () => {
    await request(app)
      .post('/api/admin/login')
      .send({
        email: 'hassomeon@bff.com',
        password: 'pasmegaround',
      })
      .expect((res) => {
        return expect(res.status).toBe(200);
      });
  });
  test('deleting users by admin with no Authorization', async () => {
    await request(app)
      .delete(`/api/admin/users/${idAdmin}`)
      .expect((res) => {
        return expect(res.status).toBe(403);
      });
  });
  test('deleting invalid users by admin with no Authorization', async () => {
    await request(app)
      .delete(`/api/admin/users/tdvtfvdtyyc`)
      .expect((res) => {
        return expect(res.status).toBe(403);
      });
  });

  //////////////// services that requires Authorization ///////////////////////

  test('--------- logging in as admin with wrong field -------', async () => {
    await request(app)
      .post('/api/admin/login')
      .send({
        emaill: 'hassomeon@bffdr.com',
        password: 'pasmegaroundhello',
      })
      .expect((res) => {
        return expect(res.status).toBe(403);
      });
  });

  test('--------- logging in as admin with wrong password -------', async () => {
    await request(app)
      .post('/api/admin/login')
      .send({
        email: 'hassomeon@bffqwert.com',
        password: 'pasmegaroundhello',
      })
      .expect((res) => {
        return expect(res.status).toBe(401);
      });
  });

  test('--------- logging in as admin with wrong password -------', async () => {
    await request(app)
      .post('/api/admin/login')
      .send({
        email: 'hassomeon@bff.com',
        password: 'pasmegaroundhello',
      })
      .expect((res) => {
        return expect(res.status).toBe(401);
      });
  });

  test('--------- logging in as admin -------', async () => {
    await request(app)
      .post('/api/admin/login')
      .send({
        email: 'hassomeon@bff.com',
        password: 'pasmegaround',
      })
      .expect((res) => {
        token = res.body.token;
        idAdmin = token.id;
        return expect(res.status).toBe(200);
      });
  });
     test('adding a real vendor', async () => {
       await request(app)
         .post('/api/vendor/users')
         .set('Authorization', `bearer ${token}`)
         .send({
           firstname: 'joeyb',
           lastname: 'idowa',
           email: 'testvendor@bff.com',
           password: 'pasmegaround',
           phone: '0787882105',
           permissions: [],
         })
         .expect(function (res) {
           return expect(res.status).toBe(201);
         })
         .catch((error) => {
           console.error(error);
           throw error;
         });
     });
        test('getting users by admin with wrong token', async () => {
          await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}qwert`)
            .expect((res) => {
              return expect(res.status).toBe(401);
            })
            .catch((err) => {
              throw err;
            });
        });

  test('getting users by admin', async () => {
    await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        console.log(res._body)
        idAdmin = res._body

        return expect(res.status).toBe(200);
      })
      .catch((err) => {
        throw err;
      });
  });
  
  test('getting single user by admin', async () => {
    await request(app)
      .get(`/api/admin/users/${idAdmin[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        return expect(res.status).toBe(200);
      });
  });

  test('deleting users by admin', async () => {
    await request(app)
      .delete(`/api/admin/users/${idAdmin[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect((res) => {
        return expect(res.status).toBe(204);
      });
  });
  
  test('deleting vendor by admin', async () => {
    await request(app)
      .delete(`/api/admin/users/${idAdmin[1].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect((res) => {
        return expect(res.status).toBe(204);
      });
  });

 
});


//  =========== BUYER REGISTRATION TESTS ===========

describe('POST Buyer register', () => {
  it('should create a return 409', async () => {
  
    let buyer = await role.findOne({where: {name: 'buyer'}})

    console.log('user')

    if(!buyer){
      buyer = await role.create({
        name: 'buyer'
      });
    }
    const newUser = await user.create({firstname: 'John', lastname: 'Doe', phone: "12345678", email: 'doe@gmail.com', password: '12345678', roleId: buyer.id});

    const response = await request(app)
      .post('/api/v1/register')
      .send({firstname: 'John', lastname: 'Doe', phone: "1234", email: 'doe@gmail.com', password: '123456', roleId: buyer.id});
    expect(response.statusCode).toBe(409);
  });
});


// User 
describe('POST Buyer register return 201', () => {

  it('should create a return 201', async () => {
    await user.destroy({where: {}});
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