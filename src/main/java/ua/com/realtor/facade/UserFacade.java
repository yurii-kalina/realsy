package ua.com.realtor.facade;

import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.RegisterRequest;
import ua.com.realtor.dto.request.UserRequest;
import ua.com.realtor.dto.response.UserResponse;
import ua.com.realtor.entity.User;
import ua.com.realtor.service.UserDetailsServiceImpl;
import ua.com.realtor.service.UserService;

@Component
public class UserFacade extends AbstractDtoFacade<UserRequest, UserResponse, User> {
  private final UserDetailsServiceImpl userDetailsService;
  private final UserService userService;

  public UserFacade(UserDetailsServiceImpl userDetailsService, UserService userService) {
    this.userDetailsService = userDetailsService;
    this.userService = userService;
  }

  public UserResponse register(RegisterRequest user) {
    return entityToDto(userDetailsService.save(modelMapper.map(user, User.class)));
  }

  public UserResponse getByPhone(String phone) {
    return entityToDto(userService.getByPhone(phone));
  }
}

