import server from '../../server';
import { requireRedirect } from '../../helpers/httpsHelper';
import chai, { expect } from '../chaiTools';
import { describe, it } from 'node:test';


describe('Http redirect test', async() => {
  it('should not redirect when it is local', async() => {
    const res = await chai.request(server).get('/api');
    console.log('res', res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("data");
  });

  it('should not redirect when it is production', async() => {
    const res = await chai.request(server).get('/api');
    console.log('res', res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("data");
  });
});