import React, { useEffect, useState } from 'react'
import FileTable from './components/FileTable'
import Container from 'react-bootstrap/Container'

function App () {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/files/data')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <Container className="my-4">
      <h2 className="mb-3">Listado de Archivos</h2>
      <FileTable data={data} />
    </Container>
  )
}

export default App
