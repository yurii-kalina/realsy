package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.UserRepository;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bcryptPasswordEncoder;

  @Autowired
  public UserDetailsServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bcryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String phone) {
    User user = userRepository.findByPhone(phone);
    if (user != null) {
      return new org.springframework.security.core.userdetails.User(user.getPhone(), user.getPassword(),
          Collections.emptyList());
    }
    return null;
  }

  public User save(User user) {
    user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }
}