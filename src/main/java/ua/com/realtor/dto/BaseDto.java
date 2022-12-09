package ua.com.realtor.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import ua.com.realtor.dto.response.Views;

import java.util.Date;

@Data
@JsonIgnoreProperties(value = {"createdAt", "lastModifiedAt"}, allowGetters = true)
public class BaseDto {
  @JsonView({Views.Favorite.class, Views.Default.class, Views.PropositionList.class, Views.AdList.class, Views.Ad.class,
      Views.Propositions.class, Views.PropositionChat.class,
      Views.PropertyList.class, Views.ChatRooms.class, Views.ChatMessage.class})
  private Long id;

  @JsonView({Views.Admin.class, Views.AdList.class, Views.Property.class, Views.PropositionList.class})
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;

  @JsonView(Views.Admin.class)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private Date lastModifiedAt;
}
