const express = require('express')
const router = express.Router()
const { getFilesData } = require('../services/fileService')

router.get('/data', async (req, res) => {
  try {
    const fileName = req.query.fileName
    const data = await getFilesData(fileName)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error procesando archivos' })
  }
})

module.exports = router
