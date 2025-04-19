const axios = require('axios')
const parse = require('csv-parse/lib/sync')

const API_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const AUTH_HEADER = { Authorization: 'Bearer aSuperSecretKey' }

async function getFilesData (fileNameFilter) {
  const files = await axios.get(`${API_URL}/files`, { headers: AUTH_HEADER })
  const validFiles = []

  for (const file of files.data.files) {
    if (fileNameFilter && file !== fileNameFilter) continue

    try {
      const res = await axios.get(`${API_URL}/file/${file}`, { headers: AUTH_HEADER })
      const parsed = parse(res.data, {
        columns: true,
        skip_empty_lines: true
      })

      const lines = parsed.filter(line =>
        line.text && line.number && line.hex
      ).map(line => ({
        text: line.text,
        number: Number(line.number),
        hex: line.hex
      }))

      validFiles.push({ file, lines })
    } catch (err) {
      // ignorar archivos con error
    }
  }

  return validFiles
}

module.exports = { getFilesData }
