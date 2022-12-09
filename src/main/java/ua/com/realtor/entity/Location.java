package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "locations")
@Data
@EqualsAndHashCode(callSuper = true)
public class Location extends BaseEntity {


  private String street;
  private String buildingNumber;
  private String geoLocation;
  @Column(name = "distance_from_metro")
  private double distanceFromMetro;

  @ManyToMany
  @JoinTable(name = "districts_location",
      joinColumns = {@JoinColumn(name = "fk_location_id", referencedColumnName = "id")},
      inverseJoinColumns = {@JoinColumn(name = "fk_district_id", referencedColumnName = "id")})
  private List<District> districts;

  @ManyToMany
  @JoinTable(name = "metros_location",
      joinColumns = {@JoinColumn(name = "fk_location_id", referencedColumnName = "id")},
      inverseJoinColumns = {@JoinColumn(name = "fk_metro_id", referencedColumnName = "id")})
  private List<Metro> metros;

  @OneToOne
  @JoinColumn(name = "city_id")
  private City city;

}
