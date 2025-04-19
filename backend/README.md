# Backend - MERN Challenge

Este es el backend del challenge, construido con **Node.js + Express**.

Expone dos endpoints:

- `GET /files/data`: procesa archivos CSV de una API externa, valida líneas y retorna los datos como JSON.
- `GET /files/list`: lista los archivos disponibles en la API externa.

---

## 🚀 Cómo correr localmente

### 🧱 Prerrequisitos

- Node.js 14+

### 📦 Instalación

```bash
npm install
```

### ▶️ Ejecutar

```bash
npm start
```

### 🔁 Modo desarrollo

```bash
npm run dev
```

---

## 🧪 Correr tests

Los tests están escritos usando **Mocha + Chai + Sinon**, y utilizan **mocking con `sinon`** para interceptar las llamadas HTTP realizadas con `axios`.

Esto permite:

- Simular la API externa de forma controlada
- Asegurar que los tests sean rápidos y estables
- Cubrir múltiples escenarios: éxito, errores, archivos malformados, filtrado

### 📦 Instalar dependencias de test

```bash
npm install --save-dev mocha chai chai-http sinon
```

### ▶️ Correr los tests

```bash
npm test
```

---

## ✅ Qué hay implementado

- Consumo seguro de API externa con `axios`
- Parser de CSV robusto con `csv-parse` y validación de columnas
- Filtro por `fileName`
- Endpoint `/files/list`
- Manejo de errores y archivos inválidos
- Tests unitarios robustos con mocks
- Dockerfile listo para producción/desarrollo
