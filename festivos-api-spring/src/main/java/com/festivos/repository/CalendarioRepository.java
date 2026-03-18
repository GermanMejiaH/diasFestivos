package com.festivos.repository;

import com.festivos.model.Calendario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface CalendarioRepository extends JpaRepository<Calendario, Long> {
  List<Calendario> findByFechaBetween(LocalDate inicio, LocalDate fin);
}
