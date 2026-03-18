package com.festivos.util;

import java.time.LocalDate;
import java.time.DayOfWeek;

public class FechaUtil {
  public static boolean esDomingo(LocalDate fecha) {
    return fecha.getDayOfWeek() == DayOfWeek.SUNDAY;
  }

  public static boolean esFechaValida(int year) {
    return year >= 1900 && year <= 2100;
  }
}
