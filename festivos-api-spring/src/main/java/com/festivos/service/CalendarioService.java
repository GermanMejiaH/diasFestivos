package com.festivos.service;

import com.festivos.model.Calendario;
import com.festivos.model.Tipo;
import com.festivos.repository.CalendarioRepository;
import com.festivos.repository.TipoRepository;
import com.festivos.util.FestivoUtil;
import com.festivos.util.FechaUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.*;

@Service
public class CalendarioService {
  private final CalendarioRepository calendarioRepository;
  private final TipoRepository tipoRepository;

  public CalendarioService(CalendarioRepository calendarioRepository, TipoRepository tipoRepository) {
    this.calendarioRepository = calendarioRepository;
    this.tipoRepository = tipoRepository;
  }

  private Tipo tipoFestivo() {
    return tipoRepository.findByTipo("Festivo").orElseGet(() -> tipoRepository.save(new Tipo("Festivo")));
  }

  private Tipo tipoDomingo() {
    return tipoRepository.findByTipo("Domingo").orElseGet(() -> tipoRepository.save(new Tipo("Domingo")));
  }

  @Transactional
  public boolean generarCalendario(int year) {
    Map<LocalDate,String> festivos = FestivoUtil.mapaFestivos(year);
    Tipo festivoTipo = tipoFestivo();
    Tipo domingoTipo = tipoDomingo();
    LocalDate inicio = LocalDate.of(year,1,1);
    LocalDate fin = LocalDate.of(year,12,31);
    List<Calendario> registros = new ArrayList<>();
    LocalDate d = inicio;
    while (!d.isAfter(fin)) {
      String desc = festivos.get(d);
      if (desc != null) {
        registros.add(new Calendario(d, festivoTipo, desc));
      } else if (FechaUtil.esDomingo(d)) {
        registros.add(new Calendario(d, domingoTipo, "Domingo"));
      } else {
        registros.add(new Calendario(d, null, null));
      }
      d = d.plusDays(1);
    }
    calendarioRepository.saveAll(registros);
    return true;
  }

  public List<Calendario> listarCalendario(int year) {
    LocalDate inicio = LocalDate.of(year,1,1);
    LocalDate fin = LocalDate.of(year,12,31);
    return calendarioRepository.findByFechaBetween(inicio, fin);
  }
}
