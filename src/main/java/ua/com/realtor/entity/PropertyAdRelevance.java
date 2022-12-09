package ua.com.realtor.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PropertyAdRelevance {
  private Long ad;
  private Double relevance;
}
