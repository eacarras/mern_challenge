import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

// Mock de fetch global
beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

test('renderiza lista de archivos y tabla con datos', async () => {
  const mockFileList = { files: ['file1.csv'] }
  const mockData = [
    {
      file: 'file1.csv',
      lines: [
        { text: 'ABC', number: 123, hex: 'abcdef1234567890abcdef1234567890' }
      ]
    }
  ]

  fetch
    .mockResolvedValueOnce({
      json: () => Promise.resolve(mockFileList)
    })
    .mockResolvedValueOnce({
      json: () => Promise.resolve(mockData)
    })

  render(<App />)

  // Espera y verifica opciones
  expect(await screen.findByRole('option', { name: '-- Ver todos --' })).toBeInTheDocument()
  expect(await screen.findByRole('option', { name: 'file1.csv' })).toBeInTheDocument()

  // Verifica fila en tabla
  expect(await screen.findByText('ABC')).toBeInTheDocument()
})

test('cambia los datos al seleccionar un archivo diferente', async () => {
  const mockFileList = { files: ['file1.csv', 'file2.csv'] }
  const mockInitialData = [
    {
      file: 'file1.csv',
      lines: [
        { text: 'ABC', number: 123, hex: 'hex1' }
      ]
    }
  ]
  const mockFilteredData = [
    {
      file: 'file2.csv',
      lines: [
        { text: 'DEF', number: 456, hex: 'hex2' }
      ]
    }
  ]

  fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockFileList) }) // /files/list
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockInitialData) }) // /files/data (sin filtro)
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockFilteredData) }) // /files/data?fileName=file2.csv

  render(<App />)

  // Esperamos que cargue "ABC"
  expect(await screen.findByText('ABC')).toBeInTheDocument()

  // Cambiamos el select a "file2.csv"
  fireEvent.change(screen.getByLabelText(/filtrar por archivo/i), {
    target: { value: 'file2.csv' }
  })

  // Esperamos que aparezca "DEF"
  expect(await screen.findByText('DEF')).toBeInTheDocument()
})
