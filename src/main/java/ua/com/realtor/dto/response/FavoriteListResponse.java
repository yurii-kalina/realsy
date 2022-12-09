package ua.com.realtor.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class FavoriteListResponse {
  private List<Long> properties;
  private List<Long> ads;
}
