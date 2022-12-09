package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatMessageRequest extends BaseDto {
  private Long chatRoomId;
  private Long senderId;
  private Long recipientId;
  private String content;

}
