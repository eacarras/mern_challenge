import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

test('renderiza el header y la lista de archivos por defecto', async () => {
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
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockFileList) }) // /files/list
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockData) })     // /files/data

  render(<App />)

  // Verifica header
  expect(await screen.findByText('React Test App')).toBeInTheDocument()

  // Verifica opciones del selector
  expect(await screen.findByRole('option', { name: '-- Ver todos --' })).toBeInTheDocument()
  expect(await screen.findByRole('option', { name: 'file1.csv' })).toBeInTheDocument()

  // Verifica que se renderiza una fila
  expect(await screen.findByText('ABC')).toBeInTheDocument()
})

test('cambia los datos al seleccionar un archivo diferente', async () => {
  const mockFileList = { files: ['file1.csv', 'file2.csv'] }
  const mockInitialData = [
    {
      file: 'file1.csv',
      lines: [{ text: 'ABC', number: 123, hex: 'hex1' }]
    }
  ]
  const mockFilteredData = [
    {
      file: 'file2.csv',
      lines: [{ text: 'DEF', number: 456, hex: 'hex2' }]
    }
  ]

  fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockFileList) })      // /files/list
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockInitialData) })   // /files/data
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockFilteredData) })  // /files/data?fileName=file2.csv

  render(<App />)

  expect(await screen.findByText('ABC')).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText(/filtrar por archivo/i), {
    target: { value: 'file2.csv' }
  })

  expect(await screen.findByText('DEF')).toBeInTheDocument()
})
