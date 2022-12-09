package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.enums.MessageStatus;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatMessageResponse extends BaseDto {
  @JsonView({Views.PropositionChat.class})
  private ChatRoomResponse chatRoom;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private UserResponse sender;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private UserResponse recipient;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private String content;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private Date timestamp;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  private MessageStatus status;
  @JsonView({Views.ChatRooms.class, Views.ChatMessage.class})
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;
}
