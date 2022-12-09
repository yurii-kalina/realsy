package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "favorites")
@Data
@EqualsAndHashCode(callSuper = true)
public class Favorite extends BaseEntity {

  @OneToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @OneToOne
  @JoinColumn(name = "ad_id", referencedColumnName = "id")
  private Ad ad;

  @OneToOne
  @JoinColumn(name = "property_id", referencedColumnName = "id")
  private Property property;

}
