package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class LocationResponse extends BaseDto {
  @JsonView({Views.ChatRooms.class, Views.Propositions.class, Views.PropositionList.class, Views.Location.class,
      Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class, Views.Property.class,})
  private CityResponse city;

  @JsonView({Views.ChatRooms.class, Views.Propositions.class, Views.PropositionList.class, Views.AdList.class,
      Views.PropertyList.class,
      Views.Ad.class, Views.Property.class})
  private List<DistrictResponse> districts;

  @JsonView({Views.Propositions.class, Views.PropositionList.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class})
  private List<MetroResponse> metros;

  @JsonView({Views.PropositionList.class, Views.Location.class, Views.Ad.class, Views.Property.class})
  private Double distanceFromMetro;

  @JsonView({Views.ChatRooms.class, Views.Propositions.class, Views.PropositionList.class, Views.PropertyList.class,
      Views.Property.class})
  private String street;

  @JsonView({Views.ChatRooms.class, Views.Propositions.class, Views.PropositionList.class, Views.PropertyList.class,
      Views.Property.class})
  private String buildingNumber;
}
