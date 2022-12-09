package ua.com.realtor;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class Application {

  @Test
  void contextLoads() {
    boolean isTrue = true;
    assertThat(isTrue).isTrue();
  }

}