package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.Date;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyResponse extends BaseDto {
  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropositionList.class, Views.Propositions.class})
  private Boolean isAvailableForSale;

  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropositionList.class, Views.Propositions.class})
  private Boolean isAvailableForRent;

  @JsonView({Views.Property.class, Views.Propositions.class})
  private Boolean isAvailableForImmediateArrival;

  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropositionList.class, Views.Propositions.class})
  private PropertyCategoryResponse propertyCategory;

  @JsonView({Views.ChatRooms.class, Views.Property.class, Views.PropertyList.class, Views.PropositionList.class,
      Views.Propositions.class})
  private LocationResponse location;

  @JsonView({Views.ChatRooms.class, Views.Property.class, Views.PropertyList.class, Views.PropositionList.class,
      Views.Propositions.class})
  private UserResponse user;

  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropertyList.class, Views.Propositions.class})
  private List<SubmittedValueResponse> values;

  @JsonView({Views.Property.class, Views.Propositions.class})
  private String description;

  @JsonView({Views.ChatRooms.class, Views.Property.class, Views.PropertyList.class, Views.PropositionList.class,
      Views.Propositions.class})
  private Double price;

  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropositionList.class, Views.Propositions.class})
  private Integer replies;

  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropositionList.class, Views.Propositions.class})
  private Integer saved;

  @JsonView({Views.Property.class, Views.PropertyList.class, Views.PropositionList.class, Views.Propositions.class})
  private Integer views;

  @JsonView({Views.ChatRooms.class, Views.Property.class, Views.PropertyList.class, Views.PropositionList.class,
      Views.Propositions.class})
  private String name;

  @JsonView({Views.Property.class, Views.Propositions.class})
  private List<PropertyImageResponse> images;

  @JsonView({Views.Property.class, Views.PropertyList.class})
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;

}
