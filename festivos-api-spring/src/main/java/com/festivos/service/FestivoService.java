package com.festivos.service;

import com.festivos.util.FestivoUtil;
import java.time.LocalDate;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class FestivoService {
  public List<Map.Entry<LocalDate,String>> listarFestivos(int year) {
    Map<LocalDate,String> m = FestivoUtil.mapaFestivos(year);
    List<Map.Entry<LocalDate,String>> list = new ArrayList<>(m.entrySet());
    list.sort(Comparator.comparing(Map.Entry::getKey));
    return list;
  }
}
