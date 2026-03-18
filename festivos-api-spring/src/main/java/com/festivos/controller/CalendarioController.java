package com.festivos.controller;

import com.festivos.model.Calendario;
import com.festivos.service.CalendarioService;
import com.festivos.util.FechaUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/calendario")
public class CalendarioController {
  private final CalendarioService calendarioService;

  public CalendarioController(CalendarioService calendarioService) {
    this.calendarioService = calendarioService;
  }

  @GetMapping("/generar/{year}")
  public ResponseEntity<?> generar(@PathVariable int year) {
    if (!FechaUtil.esFechaValida(year)) {
      return ResponseEntity.badRequest().body(Map.of("error", "Año inválido"));
    }
    boolean ok = calendarioService.generarCalendario(year);
    return ResponseEntity.ok(Map.of("success", ok));
  }

  @GetMapping("/{year}")
  public ResponseEntity<?> listar(@PathVariable int year) {
    if (!FechaUtil.esFechaValida(year)) {
      return ResponseEntity.badRequest().body(Map.of("error", "Año inválido"));
    }
    List<Calendario> lista = calendarioService.listarCalendario(year);
    List<Map<String,Object>> res = new ArrayList<>();
    for (Calendario c : lista) {
      res.add(Map.of(
        "fecha", c.getFecha().toString(),
        "tipo", c.getTipo() != null ? c.getTipo().getTipo() : null,
        "descripcion", c.getDescripcion()
      ));
    }
    return ResponseEntity.ok(res);
  }
}
