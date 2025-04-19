# Frontend - MERN Challenge

Este es el frontend del challenge, construido con **React + React Bootstrap**.

Consume el backend vía `/files/data` y permite:

- Visualizar una tabla con los datos.
- Filtrar por nombre de archivo.
- Renderizado dinámico de contenido.

---

## 🚀 Cómo correr localmente

### 🧱 Prerrequisitos

- Node.js 16+

### 📦 Instalación

```bash
npm install
```

### ▶️ Ejecutar en modo desarrollo

```bash
npm start
```

---

## 🧪 Correr tests

```bash
npm test
```

---

## ✅ Qué hay implementado

- Consumo del backend `/files/data` y `/files/list`
- Dropdown dinámico con React Bootstrap para seleccionar archivos
- Tabla responsiva con los datos
- Hooks funcionales (`useEffect`, `useState`)
- Tests unitarios con `Jest + React Testing Library`
- Webpack configurado desde cero
- Dockerfile listo


---

## 🧠 Sobre el uso de Redux

Este proyecto **no utiliza Redux**, ya que su escala y complejidad no lo requieren actualmente. Sin embargo, consideramos y documentamos una arquitectura escalable en caso de que el proyecto creciera, como se sugiere en los puntos extra del challenge.

---

### ❓¿Por qué no usamos Redux?

- La app tiene una única fuente de verdad por componente (`useState`)
- El manejo de estado es simple y contenido: lista de archivos y datos de tabla
- Los flujos de datos son lineales, sin necesidad de compartir estado entre componentes no relacionados
- Evitamos agregar complejidad innecesaria en el código y en el bundle final

Esta decisión fue tomada en línea con las buenas prácticas de evitar **over-engineering** y mantener el foco en la claridad, testabilidad y eficiencia de la solución.

---

### 🧩 ¿Cuándo y cómo escalar a Redux?

En una versión más compleja de esta app (por ejemplo, con múltiples vistas, paginación o cacheo avanzado), se puede escalar fácilmente con **Redux Toolkit**:

---

#### ✅ Paso a paso para integrar Redux:

1. Instalar Redux Toolkit y React Redux:
```bash
npm install @reduxjs/toolkit react-redux
```

2. Crear un `store.js`:
```js
import { configureStore } from '@reduxjs/toolkit'
import filesReducer from './slices/filesSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer
  }
})
```

3. Crear un `filesSlice.js`:
```js
import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    list: [],
    data: [],
    selectedFile: ''
  },
  reducers: {
    setFiles: (state, action) => { state.list = action.payload },
    setData: (state, action) => { state.data = action.payload },
    setSelectedFile: (state, action) => { state.selectedFile = action.payload }
  }
})

export const { setFiles, setData, setSelectedFile } = filesSlice.actions
export default filesSlice.reducer
```

4. Envolver la app con `<Provider>` en `index.js`:
```js
import { Provider } from 'react-redux'
import { store } from './store'

<Provider store={store}>
  <App />
</Provider>
```

5. Usar `useSelector` y `useDispatch` en los componentes:
```js
const files = useSelector(state => state.files.list)
const dispatch = useDispatch()
dispatch(setFiles([...]))
```

---

Con este patrón, se puede cachear los datos ya consultados, evitar llamadas duplicadas, y mantener una estructura escalable de forma ordenada y optimizada.
