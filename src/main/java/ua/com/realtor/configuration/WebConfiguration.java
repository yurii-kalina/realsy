package ua.com.realtor.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
  private static final String FORWARD_REACT = "forward:/index.html";

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/")
        .setViewName(FORWARD_REACT);

    registry.addViewController("/{x:[\\w\\-]+}")
        .setViewName(FORWARD_REACT);
    registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
        .setViewName(FORWARD_REACT);
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
  }
}