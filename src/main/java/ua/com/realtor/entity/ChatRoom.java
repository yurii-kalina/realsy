package ua.com.realtor.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chat_rooms")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom extends BaseEntity {
  @ManyToOne
  @JoinColumn(name = "sender")
  private User sender;

  @ManyToOne
  @JoinColumn(name = "recipient")
  private User recipient;

  @OneToMany(mappedBy = "chatRoom")
  @OrderBy(value = "createdAt DESC")
  private List<ChatMessage> messages = new ArrayList<>();
}
