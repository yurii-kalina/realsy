package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.enums.DealType;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class AdResponse extends BaseDto {

  @JsonView({Views.AdList.class, Views.Ad.class})
  private DealType type;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private PropertyCategoryResponse propertyCategory;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private LocationResponse location;

  @JsonView({Views.AdList.class, Views.Ad.class, Views.Propositions.class})
  private UserResponse user;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private List<SubmittedValueResponse> values;

  @JsonView({Views.Ad.class})
  private String description;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private Double price;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private Integer replies;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private Integer saved;

  @JsonView({Views.AdList.class, Views.Ad.class})
  private Integer views;

  @JsonView({Views.Property.class, Views.Ad.class, Views.AdList.class, Views.PropertyList.class})
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;
}
