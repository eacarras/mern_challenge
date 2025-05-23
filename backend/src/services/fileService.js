const axios = require('axios')
const { parse } = require('csv-parse/sync')

const API_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const AUTH_HEADER = { Authorization: 'Bearer aSuperSecretKey' }

async function getFilesData(fileNameFilter) {
  let fileList = []

  try {
    const response = await axios.get(`${API_URL}/files`, { headers: AUTH_HEADER })
    fileList = response.data.files
  } catch (err) {
    throw new Error('Failed to fetch file list')
  }

  if (fileNameFilter && !fileList.includes(fileNameFilter)) {
    return []
  }

  const validFiles = []

  for (const file of fileList) {
    if (fileNameFilter && file !== fileNameFilter) continue

    try {
      const res = await axios.get(`${API_URL}/file/${file}`, { headers: AUTH_HEADER })
      const parsed = parse(res.data, {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true // Permitir líneas con columnas incompletas
      })

      const lines = parsed.filter(line =>
        line.text && line.number && line.hex
      ).map(line => ({
        text: line.text,
        number: Number(line.number),
        hex: line.hex
      }))

      if (lines.length > 0) {
        validFiles.push({ file, lines })
      }
    } catch (err) {
      console.error(`Error al procesar el archivo ${file}:`, err.message)
    }
  }

  return validFiles
}

async function getFileList() {
  try {
    const res = await axios.get(`${API_URL}/files`, { headers: AUTH_HEADER })
    return res.data.files || []
  } catch (err) {
    throw new Error('No se pudo obtener la lista de archivos')
  }
}

module.exports = {
  getFilesData,
  getFileList
}
