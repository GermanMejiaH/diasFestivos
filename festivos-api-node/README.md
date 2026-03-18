# Festivos API (Node)

API en Node.js para consultar festivos en Colombia, con cálculo de Pascua, ley de “puente festivo”, análisis de solapados y CLI interactivo.

## Requisitos
- Node.js 18+ (ESM)
- MongoDB opcional (para persistencia). Si no está disponible, la API usa un fallback leyendo `data/BDFestivos.mjs`.

## Variables de entorno
Crea un archivo `.env` a partir de `.env.example`:

```
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=festivos
PORT=3000
BDFESTIVOS_PATH=./data/BDFestivos.mjs
```

> profe puede usar su propio `.env`; la API lee automáticamente estas variables con `dotenv`.

## Instalación
```
npm install
```

## Ejecutar servidor
```
npm start
```
Servidor en: `http://localhost:${PORT}`

## Endpoints
- `GET /` estado del servicio y listado de endpoints
- `GET /api/festivos/verificar/{year}/{month}/{day}`
- `GET /api/festivos/{year}` lista ordenada
- `GET /api/festivos/analisis/{year}` festivos y solapados
- `GET /api/tipos` tipos y reglas cargadas

### Formato de salida
- JSON por defecto
- Texto plano con `Accept: text/plain` o `?format=txt`

Ejemplo:
```
curl "http://localhost:3000/api/festivos/2026?format=txt"
curl "http://localhost:3000/api/festivos/analisis/2026?format=txt"
```

## CLI interactivo
Solicita el año y muestra tablas en consola:
```
npm run cli
```

## MongoDB (opcional)
- Si usas Mongo, carga los datos:
```
mongosh --eval "load('./data/BDFestivos.mjs')"
```
- La API leerá desde `MONGODB_URI` / `MONGODB_DB`. Si no hay conexión, usa el fallback.

## Entrega por GitHub
- `.env` NO se versiona (ya ignorado en `.gitignore`).
- Incluye `.env.example`, `README.md` y `data/BDFestivos.mjs` para reproducibilidad.
- Scripts:
  - `npm start` servidor
  - `npm run cli` asistente por consola

## Notas
- Los festivos trasladables se mueven al lunes.
- Jueves/Viernes Santo no se trasladan.
