package ua.com.realtor.dto.response;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;


@EqualsAndHashCode(callSuper = true)
@Data
public class FavoriteResponse extends BaseDto {
  @JsonView({Views.AdList.class, Views.Favorite.class, Views.Favorite.class})
  private AdResponse ad;
  @JsonView({Views.PropertyList.class, Views.Favorite.class, Views.Favorite.class})
  private PropertyResponse property;
}
