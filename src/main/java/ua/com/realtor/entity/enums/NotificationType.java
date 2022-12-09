package ua.com.realtor.entity.enums;

import java.io.Serializable;

public enum NotificationType implements Serializable {
  CHAT("chat"), OFFER_ACCEPTED("offer");

  private final String value;

  NotificationType(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return value;
  }
}
