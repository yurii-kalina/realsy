package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.entity.enums.NotificationStatus;
import ua.com.realtor.entity.enums.NotificationType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "notifications")
@Data
@EqualsAndHashCode(callSuper = true)
public class Notification extends BaseEntity {
  @ManyToOne
  @JoinColumn(name = "user_id")
  User user;
  private String title;
  private String url;
  @Enumerated(value = EnumType.STRING)
  private NotificationType type;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "status", columnDefinition = "ENUM('SENT', 'READ')")
  private NotificationStatus status;

}
