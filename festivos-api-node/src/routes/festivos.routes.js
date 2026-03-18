import { Router } from "express";
import { verificarFestivo, listarFestivos, analizar, listarTipos } from "../controllers/festivos.controller.js";

const router = Router();

router.get("/tipos", listarTipos);
router.get("/festivos/verificar/:year/:month/:day", verificarFestivo);
router.get("/festivos/analisis/:year?", analizar);
router.get("/festivos/:year", listarFestivos);

export default router;
