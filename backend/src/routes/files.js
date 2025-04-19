const express = require('express')
const router = express.Router()
const { getFilesData, getFileList } = require('../services/fileService')

router.get('/data', async (req, res) => {
  try {
    const fileName = req.query.fileName
    const data = await getFilesData(fileName)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error procesando archivos' })
  }
})

router.get('/list', async (req, res) => {
  try {
    const files = await getFileList()
    res.status(200).json({ files })
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la lista de archivos' })
  }
})

module.exports = router
