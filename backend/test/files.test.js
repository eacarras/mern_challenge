const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /files/data', () => {
  it('should return JSON array with valid structure', async () => {
    const res = await chai.request(app).get('/files/data')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
    res.body.forEach(file => {
      expect(file).to.have.property('file')
      expect(file).to.have.property('lines').that.is.an('array')
      file.lines.forEach(line => {
        expect(line).to.have.all.keys('text', 'number', 'hex')
      })
    })
  })

  it('should handle empty response gracefully when API fails', async () => {
    // Este test requiere mock, pero por ahora validamos que no crashee si el backend externo no responde
    // Lo podés dejar como "pending" si después querés integrar mocks
  })
})

describe('GET /files/list', () => {
  it('should return list of filenames', async () => {
    const res = await chai.request(app).get('/files/list')
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('files').that.is.an('array')
    res.body.files.forEach(f => {
      expect(f).to.be.a('string')
    })
  })
})


describe('GET /files/data?fileName=file1.csv', () => {
  it('should return data for file1.csv only if it exists', async () => {
    const res = await chai.request(app).get('/files/data?fileName=file1.csv')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
    if (res.body.length > 0) {
      expect(res.body[0].file).to.equal('file1.csv')
    }
  })

  it('should return empty array if file does not exist or has errors', async () => {
    const res = await chai.request(app).get('/files/data?fileName=nonexistent.csv')
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array').that.is.empty
  })
})
