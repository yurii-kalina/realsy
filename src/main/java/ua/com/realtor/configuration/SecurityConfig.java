package ua.com.realtor.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.filter.JwtAuthenticationFilter;
import ua.com.realtor.filter.JwtAuthorizationFilter;
import ua.com.realtor.service.UserDetailsServiceImpl;

import static ua.com.realtor.constant.ApiConstants.API_ADDRESS;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final BCryptPasswordEncoder bcryptPasswordEncoder;
  private final UserDetailsServiceImpl userDetailsService;
  @Value("${auth.expiration_time}")
  private Long expirationTime;
  @Value("${auth.secret}")
  private String secret;
  @Value("${auth.secret}")
  private String tokenPrefix;
  @Value("${auth.cookieName}")
  private String cookieName;

  @Autowired
  public SecurityConfig(BCryptPasswordEncoder bcryptPasswordEncoder, UserDetailsServiceImpl userDetailsService) {
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
    this.userDetailsService = userDetailsService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http
        .csrf()
        .disable()
        .formLogin().disable()
        .httpBasic().disable()
        .authorizeRequests()
        .antMatchers("/console/**").permitAll()
        .antMatchers("/",
            "/ad/**",
            "/property/**",
            "/propositions/**",
            "/favorites/**",
            "chat/**",
            "/users/**",
            "/error",
            "/favicon.ico",
            "/**/*.png",
            "/**/*.gif",
            "/**/*.json",
            "/**/*.svg",
            "/**/*.jpg",
            "/**/*.html",
            "/**/*.css",
            "/**/*.js").permitAll()
        .antMatchers("/static/**").permitAll()
        .antMatchers("/resources/**").permitAll()
        .antMatchers("/api/"
            + ApiConstants.API_VERSION + "/users/auth/**").permitAll()
        .antMatchers(HttpMethod.GET, API_ADDRESS
            + ApiConstants.API_VERSION + "/property/**").permitAll()
        .antMatchers(HttpMethod.GET, API_ADDRESS
            + ApiConstants.API_VERSION + "/**").permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilter(new JwtAuthenticationFilter(authenticationManager(), expirationTime, secret, cookieName))
        .addFilter(new JwtAuthorizationFilter(authenticationManager(), secret, cookieName))
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(bcryptPasswordEncoder);
  }
}
