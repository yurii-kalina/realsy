package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.realtor.dto.BaseDto;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse extends BaseDto {
  @JsonView({Views.ChatRooms.class, Views.Propositions.class, Views.Ad.class, Views.Property.class,
      Views.PropositionList.class})
  private String fullName;

  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class, Views.Propositions.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class, Views.PropertyList.class, Views.FavoriteList.class, Views.Favorite.class,
      Views.PropositionList.class})
  private String avatar;

  @JsonView({Views.Propositions.class, Views.Ad.class, Views.Property.class})
  private String phone;

  @JsonView({Views.Ad.class, Views.Property.class})
  private Boolean isWorking;

  @JsonView({Views.Ad.class, Views.Property.class})
  private Boolean isSmoker;

  @JsonView({Views.Propositions.class, Views.Ad.class, Views.Property.class})
  private Boolean isPhoneVisible;

  @JsonView({Views.Ad.class, Views.Property.class})
  private String occupation;

  @JsonView({Views.Property.class, Views.Ad.class, Views.Propositions.class})
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;
}
