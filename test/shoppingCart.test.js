import db from '../src/database/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { vendorId} from './vendor.test';
import { vendorToken,productAttributeId} from './products.test';


describe('shopping cart based functionlaities',()=>{
    chai.use(chaiHttp);
    chai.should();
    it('shoudl say welcome',()=>{
        console.log('HHHH-HDHDHD-HHH',productAttributeId);
    })
    it('shoud add products to the shopping cart',async()=>{
        const res = await chai.request(app).post('/api/v1/shoppingCart/add') 
        .set('Authorization', `Bearer ${vendorToken}`).
        send({
         buyer: vendorId,
         productId: productAttributeId
        });
        res.statusCode.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('status');
      });
});