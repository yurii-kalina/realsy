package ua.com.realtor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.RegisterRequest;
import ua.com.realtor.dto.response.UserResponse;
import ua.com.realtor.facade.UserFacade;
import ua.com.realtor.util.CookieUtil;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@RestController
@RequestMapping(value = ApiConstants.API_ADDRESS + ApiConstants.API_VERSION + "/users")
public class UserController {
  private final UserFacade userFacade;
  private final CookieUtil cookieUtil;

  @Autowired
  public UserController(UserFacade userFacade, CookieUtil cookieUtil) {
    this.userFacade = userFacade;
    this.cookieUtil = cookieUtil;

  }

  @GetMapping("/auth/currentUser")
  public UserResponse getCurrentUser(Principal principal) {
    if (principal != null) {
      return userFacade.getByPhone(principal.getName());
    } else {
      throw new AccessDeniedException("You need to be logged in");
    }
  }

  @PostMapping("/auth/logout")
  public void logout(Principal principal, HttpServletResponse response) {
    response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.deleteAccessTokenCookie().toString());
  }

  @GetMapping("/favorites/{id}")
  public void saveFavorite(@PathVariable Long id) {
    // save ad
  }

  @PostMapping("/auth/register")
  public UserResponse register(@RequestBody RegisterRequest registerRequest) {
    return userFacade.register(registerRequest);
  }
}
