package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "metros")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "city")
@ToString(exclude = "city")
public class Metro extends BaseEntity {
  private String name;

  @Column(name = "metro_line")
  private String metroLine;

  @ManyToOne
  @JoinColumn(name = "city_id")
  private City city;

}