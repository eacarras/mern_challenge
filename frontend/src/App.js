import React, { useEffect, useState } from 'react'
import Header from './components/Header'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

import Form from 'react-bootstrap/Form'
import FileTable from './components/FileTable'

const API_URL = 'http://localhost:5001/files'

function App () {
  const [fileList, setFileList] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const fetchData = async (fileName = '') => {
    setLoading(true)
    try {
      const [filesRes, dataRes] = await Promise.all([
        fetch(`${API_URL}/list`).then(res => res.json()),
        fetch(`${API_URL}/data${fileName ? `?fileName=${fileName}` : ''}`).then(res => res.json())
      ])
      setFileList(filesRes.files)
      setData(dataRes)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carga inicial
  useEffect(() => {
    fetchData()
  }, [])

  // Cuando cambia el filtro
  useEffect(() => {
    if (fileList.length) {
      fetchData(selectedFile)
    }
  }, [selectedFile])

  return (
    <>
      <Header />
      <Container className="my-4">
        <h2 className="mb-3">Listado de Archivos</h2>

        <Form.Group className="mb-4" controlId="fileSelector">
          <Form.Label>Filtrar por archivo</Form.Label>
          <Form.Select
            value={selectedFile}
            onChange={e => setSelectedFile(e.target.value)}
          >
            <option value="">-- Ver todos --</option>
            {fileList.map(file => (
              <option key={file} value={file}>{file}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
            <div className="mt-2">Cargando datos...</div>
          </div>
        ) : (
          <FileTable data={data} />
        )}
      </Container>
    </>
  )
}

export default App
