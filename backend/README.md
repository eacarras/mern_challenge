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

### 🧪 Correr tests

```bash
npm test
```

---

## ✅ Qué hay implementado

- Consumo seguro de API externa con `axios`
- Parser de CSV robusto con `csv-parse`
- Validación de datos malformados
- Filtro por `fileName`
- Endpoint `/files/list`
- Tests unitarios con `Mocha + Chai`
- Dockerfile listo para producción/desarrollo
