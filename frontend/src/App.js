import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FileTable from './components/FileTable'

function App () {
  const [fileList, setFileList] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const [data, setData] = useState([])

  // Obtener lista de archivos
  useEffect(() => {
    fetch('/files/list')
      .then(res => res.json())
      .then(json => setFileList(json.files))
      .catch(console.error)
  }, [])

  // Obtener datos filtrados
  useEffect(() => {
    const url = selectedFile
      ? `/files/data?fileName=${selectedFile}`
      : '/files/data'

    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error)
  }, [selectedFile])

  return (
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

      <FileTable data={data} />
    </Container>
  )
}

export default App
