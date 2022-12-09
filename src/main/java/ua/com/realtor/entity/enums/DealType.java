package ua.com.realtor.entity.enums;

import java.io.Serializable;

public enum DealType implements Serializable {
  RENT("RENT"), BUY("BUY");

  private final String value;

  DealType(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return value;
  }
}
