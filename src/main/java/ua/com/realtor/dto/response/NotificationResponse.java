package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.enums.NotificationStatus;
import ua.com.realtor.entity.enums.NotificationType;

@EqualsAndHashCode(callSuper = true)
@Data
public class NotificationResponse extends BaseDto {
  @JsonView({Views.Default.class, Views.Notification.class})
  private String title;

  @JsonView({Views.Default.class, Views.Notification.class})
  private UserResponse user;

  @JsonView({Views.Default.class, Views.Notification.class})
  private NotificationType type;

  @JsonView({Views.Default.class, Views.Notification.class})
  private NotificationStatus status;


}
