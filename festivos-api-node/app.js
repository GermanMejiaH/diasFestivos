import "dotenv/config";
import express from "express";
import festivosRouter from "./src/routes/festivos.routes.js";

const app = express();
app.use(express.json());

app.use("/api", festivosRouter);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    endpoints: [
      "/api/festivos/verificar/{year}/{month}/{day}",
      "/api/festivos/{year}",
      "/api/festivos/analisis?year={year}",
      "/api/tipos"
    ]
  });
});
