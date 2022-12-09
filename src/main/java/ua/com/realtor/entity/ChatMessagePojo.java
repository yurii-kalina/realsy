package ua.com.realtor.entity;

import lombok.Builder;
import lombok.Data;
import ua.com.realtor.entity.enums.MessageStatus;

import java.util.Date;

@Data
@Builder
public class ChatMessagePojo {
  private Long id;
  private Long sender;
  private Long recipient;
  private Long chatRoom;
  private MessageStatus status;
  private String content;
  private Date timestamp;
  private String avatar;
}
