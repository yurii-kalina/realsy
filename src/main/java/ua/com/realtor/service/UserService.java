package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.UserRepository;

@Service
public class UserService extends AbstractBaseEntityService<User> {
  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getByPhone(String phone) {
    return userRepository.findByPhone(phone);
  }

}
