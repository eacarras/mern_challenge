const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /files/data', () => {
  it('should return JSON array', async () => {
    const res = await chai.request(app).get('/files/data')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
  })
})
