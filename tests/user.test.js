import request from 'supertest';
import app from '../src/index.js';

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
        return expect(res.status).toBe(403);
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

  test('getting users by admin', async () => {
    await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        idAdmin = res._body[0].id;
        return expect(res.status).toBe(200);
      })
      .catch((err) => {
        throw err;
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
  
  test('getting single user by admin', async () => {
    await request(app)
      .get(`/api/admin/users/${idAdmin}`)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        return expect(res.status).toBe(200);
      });
  });

  test('deleting users by admin', async () => {
    await request(app)
      .delete(`/api/admin/users/${idAdmin}`)
      .set('Authorization', `bearer ${token}`)
      .expect((res) => {
        return expect(res.status).toBe(204);
      });
  });
});
