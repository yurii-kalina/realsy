package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_property")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserProperty extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "fk_user_id")
  User userId;

  @ManyToOne
  @JoinColumn(name = "fk_property_id")
  Property propertyId;

}
