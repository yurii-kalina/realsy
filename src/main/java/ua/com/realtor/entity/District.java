package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "districts")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "city")
@ToString(exclude = "city")
public class District extends BaseEntity {
  private String name;

  @ManyToOne
  @JoinColumn(name = "city_id")
  private City city;
}
