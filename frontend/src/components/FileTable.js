import React from 'react'
import Table from 'react-bootstrap/Table'

function FileTable ({ data }) {
  if (!data || data.length === 0) {
    return <p>No hay resultados disponibles.</p>
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>File</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {data.map(file =>
          file.lines.map((line, idx) => (
            <tr key={`${file.file}-${idx}`}>
              <td>{file.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default FileTable
