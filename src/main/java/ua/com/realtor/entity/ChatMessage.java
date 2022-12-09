package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import ua.com.realtor.entity.enums.MessageStatus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "chat_messages")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "chatRoom")
@ToString(exclude = "chatRoom")
public class ChatMessage extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "chat_room_id")
  private ChatRoom chatRoom;

  @ManyToOne
  @JoinColumn(name = "sender_id")
  private User sender;

  @ManyToOne
  @JoinColumn(name = "recipient_id")
  private User recipient;

  private String content;
  private Date timestamp;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "status", columnDefinition = "ENUM('SENT', 'READ')")
  private MessageStatus status;
}
