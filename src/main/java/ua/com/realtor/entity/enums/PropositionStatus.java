package ua.com.realtor.entity.enums;

import java.io.Serializable;

public enum PropositionStatus implements Serializable {
  NEW("NEW"), PENDING("PENDING"), REJECTED("REJECTED"), ACCEPTED("ACCEPTED"), SEEN("SEEN");

  private final String value;

  PropositionStatus(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return value;
  }
}
