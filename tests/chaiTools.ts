const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
export const { assert, expect, should } = chai;
export default chai;

