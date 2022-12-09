package ua.com.realtor.repository;

import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.Notification;

@Repository
public interface NotificationRepository extends BaseEntityRepository<Notification> {
}
