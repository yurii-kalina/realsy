package ua.com.realtor.constant;

public class SecurityConstants {
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";

  private SecurityConstants() {
    throw new IllegalStateException("Utility class");
  }

}
