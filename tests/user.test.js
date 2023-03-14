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
        token = res.body.token;
        console.log(token);
        return expect(res.status).toBe(403);
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
}); 