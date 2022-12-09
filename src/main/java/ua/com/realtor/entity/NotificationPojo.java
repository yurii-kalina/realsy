package ua.com.realtor.entity;

import lombok.Builder;
import lombok.Data;
import ua.com.realtor.entity.enums.NotificationStatus;
import ua.com.realtor.entity.enums.NotificationType;

@Data
@Builder
public class NotificationPojo {
  private Long id;
  private String title;
  private String entity;
  private Long entityId;
  private String entityName;
  private Long user;
  private NotificationType type;
  private NotificationStatus status;
}
