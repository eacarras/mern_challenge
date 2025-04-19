const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const axios = require('axios')
const app = require('../src/app')

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /files endpoints (with mock)', () => {
  let axiosGetStub

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should return JSON array with valid structure', async () => {
    // Mock archivo válido
    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/files')
      .resolves({ data: { files: ['file1.csv'] } })

    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/file/file1.csv')
      .resolves({
        data: `file,text,number,hex\nfile1.csv,hello,1234,abcdef1234567890abcdef1234567890`
      })

    const res = await chai.request(app).get('/files/data')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array').that.has.lengthOf(1)

    const file = res.body[0]
    expect(file.file).to.equal('file1.csv')
    expect(file.lines).to.be.an('array').that.deep.includes({
      text: 'hello',
      number: 1234,
      hex: 'abcdef1234567890abcdef1234567890'
    })
  })

  it('should return list of filenames', async () => {
    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/files')
      .resolves({ data: { files: ['file1.csv', 'file2.csv'] } })

    const res = await chai.request(app).get('/files/list')
    expect(res).to.have.status(200)
    expect(res.body.files).to.deep.equal(['file1.csv', 'file2.csv'])
  })

  it('should filter by fileName if provided', async () => {
    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/files')
      .resolves({ data: { files: ['file1.csv', 'file2.csv'] } })

    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/file/file1.csv')
      .resolves({
        data: `file,text,number,hex\nfile1.csv,filtered,42,deadbeefdeadbeefdeadbeefdeadbeef`
      })

    const res = await chai.request(app).get('/files/data?fileName=file1.csv')
    expect(res).to.have.status(200)
    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('file1.csv')
    expect(res.body[0].lines[0].text).to.equal('filtered')
  })

  it('should return empty array if file is invalid', async () => {
    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/files')
      .resolves({ data: { files: ['file_broken.csv'] } })

    axiosGetStub
      .withArgs('https://echo-serv.tbxnet.com/v1/secret/file/file_broken.csv')
      .resolves({
        data: `file,text\nfile_broken.csv,missing,columns`
      })

    const res = await chai.request(app).get('/files/data')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array').that.is.empty
  })
})
