package com.festivos.controller;

import com.festivos.service.FestivoService;
import com.festivos.util.FechaUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/festivos")
public class FestivoController {
  private final FestivoService festivoService;

  public FestivoController(FestivoService festivoService) {
    this.festivoService = festivoService;
  }

  @GetMapping("/{year}")
  public ResponseEntity<?> listar(@PathVariable int year) {
    if (!FechaUtil.esFechaValida(year)) {
      return ResponseEntity.badRequest().body(Map.of("error", "Año inválido"));
    }
    var lista = festivoService.listarFestivos(year);
    var res = new ArrayList<Map<String,Object>>();
    for (var e : lista) {
      res.add(Map.of("fecha", e.getKey().toString(), "descripcion", e.getValue()));
    }
    return ResponseEntity.ok(res);
  }
}
