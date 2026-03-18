package com.festivos.util;

import java.time.LocalDate;
import java.time.DayOfWeek;
import java.util.*;

public class FestivoUtil {
  private static LocalDate trasladarALunes(LocalDate fecha) {
    DayOfWeek d = fecha.getDayOfWeek();
    if (d == DayOfWeek.MONDAY) return fecha;
    int diff = (DayOfWeek.MONDAY.getValue() - d.getValue() + 7) % 7;
    return fecha.plusDays(diff);
  }

  private static List<Map.Entry<LocalDate,String>> fijos(int year) {
    return List.of(
      Map.entry(LocalDate.of(year,1,1),"Año Nuevo"),
      Map.entry(LocalDate.of(year,5,1),"Día del Trabajo"),
      Map.entry(LocalDate.of(year,7,20),"Independencia de Colombia"),
      Map.entry(LocalDate.of(year,8,7),"Batalla de Boyacá"),
      Map.entry(LocalDate.of(year,12,8),"Inmaculada Concepción"),
      Map.entry(LocalDate.of(year,12,25),"Navidad")
    );
  }

  private static List<Map.Entry<LocalDate,String>> trasladablesBase(int year) {
    return List.of(
      Map.entry(LocalDate.of(year,1,6),"Epifanía"),
      Map.entry(LocalDate.of(year,3,19),"San José"),
      Map.entry(LocalDate.of(year,6,29),"San Pedro y San Pablo"),
      Map.entry(LocalDate.of(year,8,15),"Asunción de la Virgen"),
      Map.entry(LocalDate.of(year,10,12),"Día de la Raza"),
      Map.entry(LocalDate.of(year,11,1),"Todos los Santos"),
      Map.entry(LocalDate.of(year,11,11),"Independencia de Cartagena")
    );
  }

  private static List<Map.Entry<LocalDate,String>> pascua(LocalDate pascua) {
    LocalDate jueves = pascua.minusDays(3);
    LocalDate viernes = pascua.minusDays(2);
    LocalDate asc = pascua.plusDays(40);
    LocalDate corpus = pascua.plusDays(60);
    LocalDate sagrado = pascua.plusDays(68);
    return List.of(
      Map.entry(jueves,"Jueves Santo"),
      Map.entry(viernes,"Viernes Santo"),
      Map.entry(trasladarALunes(asc),"Ascensión del Señor"),
      Map.entry(trasladarALunes(corpus),"Corpus Christi"),
      Map.entry(trasladarALunes(sagrado),"Sagrado Corazón de Jesús")
    );
  }

  public static Map<LocalDate,String> mapaFestivos(int year) {
    Map<LocalDate,String> m = new HashMap<>();
    for (var e : fijos(year)) m.put(e.getKey(), e.getValue());
    for (var e : trasladablesBase(year)) m.put(trasladarALunes(e.getKey()), e.getValue());
    for (var e : pascua(PascuaUtil.calcularPascua(year))) m.put(e.getKey(), e.getValue());
    return m;
  }
}
