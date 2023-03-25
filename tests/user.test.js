import request from 'supertest';
import app from '../src/index.js';
import {user ,role } from '../src/models';
import { comparePassword } from '../src/utils/verifyPassword.js';

describe('GET /', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
let loged_token;
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
      .post('/api/v1/users/login')
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
      .post('/api/v1/users/login')
      .send({
        emaill: 'hassomeon@bffdr.com',
        password: 'pasmegaroundhello',
      })
      .expect((res) => {
        return expect(res.status).toBe(500);
      });
  });

  test('--------- logging in as admin with wrong password -------', async () => {
    await request(app)
      .post('/api/v1/users/login')
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
      .post('/api/v1/users/login')
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
      .post('/api/v1/users/login')
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
          idvendor = res.body.data.id;
           return expect(res.status).toBe(201);
         })
         .catch((error) => {
           console.error(error);
           throw error;
         });
     });

     it('should disable an existing user', async () => {
      const response =  await request(app)
        .put(`/api/v1/users/${idvendor}/disable`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('should return 403 if the user is already disabled', async () => {
      const response = await request(app)
      .put(`/api/v1/users/${idvendor}/disable`)
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(403);
    });

    
    it('should enable an existing user', async () => {
      const response = await request(app)
      .put(`/api/v1/users/${idvendor}/enable`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    it('should return 403 if the user is already enabled', async () => {
      const response = await request(app)
      .put(`/api/v1/users/${idvendor}/enable`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });

    it('should return 400 if the user to enable not exist', async () => {
      const response = await request(app)
      .put(`/api/v1/users/4f315d1d-121a-493a-a7d2-2ac7aafb2bd6/enable`)
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  
    it('should return 400 if the user  to disable not exist', async () => {
      const response = await request(app)
      .put(`/api/v1/users/4f315d1d-121a-493a-a7d2-2ac7aafb2bd6/disable`)
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
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
let pass_token;
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
  expect(response.statusCode).toBe(200);
  console.log('It should secondly',response.body);
  loged_token = response.body.token;
  });
});
describe('verify the email if it is valid for the password reset ', () => {

  it('should create a return 201', async () => {
  const response = await request(app)
  .post('/api/v1/email')
  .send({email: 'doe1@gmail.com'});
  expect(response.statusCode).toBe(200);
  console.log('It should appear hear',response.body);
  expect(response.body).toHaveProperty("token");
  pass_token=response.body.token;
  });
});
describe('the password reset ', () => {

  it('should create a return 201', async () => {
    const response =await request(app)
    
  .post(`/api/v1/password/${pass_token}`)
  .send({password: '123'});
  expect(response.body).toHaveProperty("message");
  });
});
describe('the password reset second time should fail ', () => {

  it('should create a return 201', async () => {
    const response =await request(app)
    
  .post(`/api/v1/password/${pass_token}`)
  .send({password: '1235'});
  expect(response.body).toHaveProperty("message");
  });
});
describe('verify the email if it is valid for the password reset ', () => {

  it('should create a return 201', async () => {
  const response = await request(app)
  .post('/api/v1/email')
  .send({email: 'doe147@gmail.com'});
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("message");
  pass_token=response.body.token;
  });
});

describe('the password reset with non-valid token', () => {

  it('should create a return error', async () => {
    const response =await request(app)
  .post(`/api/v1/password/${pass_token}e`)
  .set('Accept-Language', `fr`)
  .send({password: '123'});
  expect(response.body).toHaveProperty("message");
  });
});
describe('the password reset when user is already logged in', () => {

  it('should create a return error', async () => {
    const response =await request(app)
  .post(`/api/v1/password`)
  .set('Authorization', `Bearer ${loged_token}`)
  .set('Accept-Language', `fr`)
  .send({xpassword: '12', npassword: '1238'});
  expect(response.body).toHaveProperty("message");
  });
});
describe('the password reset when user is already logged in', () => {

  it('should create a return 201', async () => {
    const response =await request(app)
  .post(`/api/v1/password`)
  .set('Authorization', `Bearer ${loged_token}`)
  .set('Accept-Language', `fr`)
  .send({xpassword: '123', npassword: '1238'});
  expect(response.body).toHaveProperty("message");
  });
});


describe('the password reset with non-valid token', () => {

  it('should create a return error', async () => {
    const response =await request(app)
  .post(`/api/v1/password/${pass_token}e`)
  .set('Accept-Language', `fr`)
  .send({password: '123'});
  expect(response.body).toHaveProperty("message");
  });
});


describe('the password reset with non-valid token', () => {

  it('should create a return error', async () => {
    const response =await request(app)
  .post(`/api/v1/password/${pass_token}e`)
  .set('Accept-Language', `fr`)
  .send({password: '123'});
  expect(response.body).toHaveProperty("message");
  });
});

describe('POST Buyer register', () => {
  it('should create a return 400', async () => {
    const response = await request(app)
      .post('/api/v1/register');
    expect(response.statusCode).toBe(400);
  });
});
/////verification code testing from vendor//////
describe('verifyOTP', () => {
  it('should return "please login first" if no cookies are present', async () => {
    const response = await request(app)
      .post('/api/vendor/verify')
      .send({ token: '354482' });
    expect(response.statusCode).toBe(403);
  });
  it('should return "it is not validated" if the incoming token does not match the saved token', async () => {
    const response = await request(app)
      .post('/api/vendor/verify')
      .set('Cookie', 'onloginToken=374829; onloggingUserid=1')
      .send({ token: '463829' });
    expect(response.statusCode).toBe(500);
  });
  it('should return "verified...!,welcome" and an access token if the incoming token matches the saved token', async () => {
    const mockUser = { id: 1, email: 'ben@example.com' };
    const mockToken = 'some_encoded_token';
    const response = await request(app)
      .post('/verify-otp')
      .set('Cookie', `onloginToken=${mockToken}; onloggingUserid=${mockUser.id}`)
      .send({ token: '374829' });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe();
  });
});