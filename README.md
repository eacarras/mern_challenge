# MERN Full Stack Challenge

Este proyecto es la solución a un **code challenge para Tech Lead Full Stack (MERN)**.

La aplicación consiste en un **backend Node.js + Express** que consume una API externa, procesa archivos `.csv`, y expone los datos a través de una API REST. A su vez, un **frontend en React + React Bootstrap** permite visualizar esta información y filtrarla por nombre de archivo.

---

## 📦 Tech Stack

- **Backend:** Node.js, Express, Axios, csv-parse, Mocha, Chai
- **Frontend:** React, React Bootstrap, Webpack, Jest, React Testing Library
- **Infraestructura:** Docker, Docker Compose

---

## 🧠 ¿Por qué esta estructura?

Optamos por una estructura **monorepo con Docker Compose** para facilitar el desarrollo local, el despliegue y la gestión de dependencias entre frontend y backend.

- El backend está desacoplado en servicios y rutas.
- El frontend usa programación funcional con Hooks, UI clara, y está preparado para escalar (incluso con Redux si se desea).
- Se incluyen puntos opcionales del challenge: filtros, endpoint de listado, pruebas unitarias y Docker.

---

## 🚀 Cómo levantar el proyecto completo

### 🧱 Prerrequisitos

- Node.js 16+ y 14+ (opcional si corrés local sin Docker)
- Docker & Docker Compose

### ⚙️ Levantar con Docker Compose

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000

- Backend API: http://localhost:5000


---
## 📁 Estructura del Repositorio

```bash
mern-challenge/
├── backend/         # API REST en Node.js + Express
├── frontend/        # Cliente en React + React Bootstrap
├── docker-compose.yml
├── README.md        # Este archivo
