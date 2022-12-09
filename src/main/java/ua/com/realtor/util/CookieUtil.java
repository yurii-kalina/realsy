package ua.com.realtor.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {
  @Value("${auth.cookieName}")
  private String cookieName;

  public HttpCookie createAccessTokenCookie(String token, Long duration) {
    return ResponseCookie.from(cookieName, token)
        .maxAge(duration)
        .httpOnly(true)
        .path("/")
        .build();
  }

  public HttpCookie deleteAccessTokenCookie() {
    return ResponseCookie.from(cookieName, "").maxAge(0).httpOnly(true).path("/").build();
  }
}
