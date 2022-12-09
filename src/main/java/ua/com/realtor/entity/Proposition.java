package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.entity.enums.PropositionStatus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "propositions")
@Data
@EqualsAndHashCode(callSuper = true)
public class Proposition extends BaseEntity {
  @ManyToOne
  @JoinColumn(name = "property_id")
  private Property property;
  @ManyToOne
  @JoinColumn(name = "ad_id")
  private Ad ad;
  @Enumerated(value = EnumType.STRING)
  @Column(columnDefinition = "ENUM('NEW', 'PENDING', 'REJECTED', 'ACCEPTED', 'SEEN')")
  private PropositionStatus status;
  private boolean isActive;
  private double ownerPrice;
  private double clientPrice;
}
