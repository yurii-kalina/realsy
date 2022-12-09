package ua.com.realtor.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.HttpServerErrorException;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.LoginRequest;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static ua.com.realtor.constant.SecurityConstants.HEADER_STRING;
import static ua.com.realtor.constant.SecurityConstants.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final Long expirationTime;
  private final String secret;
  private final String cookieName;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                 Long expirationTime,
                                 String secret,
                                 String cookieName
  ) {
    this.setFilterProcessesUrl("/api/" + ApiConstants.API_VERSION + "/users/auth/login");
    this.authenticationManager = authenticationManager;
    this.expirationTime = expirationTime;
    this.secret = secret;
    this.cookieName = cookieName;
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req,
                                              HttpServletResponse res) {
    try {
      LoginRequest creds = new ObjectMapper()
          .readValue(req.getInputStream(), LoginRequest.class);
      return authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              creds.getPhone(),
              creds.getPassword(),
              new ArrayList<>())
      );
    } catch (IOException e) {
      throw new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req,
                                          HttpServletResponse res,
                                          FilterChain chain,
                                          Authentication auth) {
    User user = (User) auth.getPrincipal();
    Date now = new Date();
    long duration = now.getTime() + expirationTime;
    Date expiryDate = new Date(duration);

    String token = Jwts.builder()
        .setSubject(user.getUsername())
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
    res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    ResponseCookie cookie = ResponseCookie.from(cookieName, token)
        .maxAge(expirationTime)
        .httpOnly(true)
        .path("/")
        .build();
    res.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
  }
}