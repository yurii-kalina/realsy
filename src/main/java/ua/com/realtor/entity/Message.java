package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "messages")
@Data
@EqualsAndHashCode(callSuper = true)
public class Message extends BaseEntity {

  @Column(name = "text_message")
  private String textMessage;
  @ManyToOne
  @JoinColumn(name = "fk_receiver_id")
  private User receiverId;
  @ManyToOne
  @JoinColumn(name = "fk_sender_id")
  private User senderId;

  @Column(name = "message_from")
  private double from;

  @Column(name = "message_to")
  private double to;


}
