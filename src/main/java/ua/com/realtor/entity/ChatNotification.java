package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "chat_notifications")
@Data
@EqualsAndHashCode(callSuper = true)
public class ChatNotification extends BaseEntity {
  @Column(name = "sender_id")
  private String senderId;
  @Column(name = "sender_name")
  private String senderName;
}
