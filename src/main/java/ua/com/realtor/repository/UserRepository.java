package ua.com.realtor.repository;

import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.User;

@Repository
public interface UserRepository extends BaseEntityRepository<User> {
  User findByPhone(String phone);
}
