package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatRoomResponse extends BaseDto {
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private UserResponse sender;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private UserResponse recipient;
  @JsonView({Views.ChatMessage.class, Views.ChatMessage.class})
  private List<ChatMessageResponse> messages = new ArrayList<>();
}
