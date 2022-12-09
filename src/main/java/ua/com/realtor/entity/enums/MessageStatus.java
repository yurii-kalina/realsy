package ua.com.realtor.entity.enums;

import java.io.Serializable;

public enum MessageStatus implements Serializable {
  SENT("SENT"), READ("READ");

  private final String value;

  MessageStatus(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return value;
  }
}
