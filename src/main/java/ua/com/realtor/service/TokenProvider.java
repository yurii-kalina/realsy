package ua.com.realtor.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class TokenProvider {

  @Value("${auth.expiration_time}")
  private Long expirationTime;

  @Value("${auth.secret}")
  private String secret;

  public String generateToken(String subject) {
    Date now = new Date();
    long duration = now.getTime() + expirationTime;
    Date expiryDate = new Date(duration);
    return Jwts.builder()
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
  }

  public String getUserFromToken(String token) {
    Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    return claims.getSubject();
  }
}
