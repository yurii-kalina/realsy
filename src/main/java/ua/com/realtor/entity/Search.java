package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "searchs")
@Data
@EqualsAndHashCode(callSuper = true)
public class Search extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "fk_user_id")
  User userId;

  @ManyToMany
  @JoinTable(
      name = "search_location",
      joinColumns = @JoinColumn(name = "fk_search_id"),
      inverseJoinColumns = @JoinColumn(name = "fk_location_id"))
  List<Location> locationArrayList = new ArrayList<>();

  private String name;
  private String description;
  private double price;
  private boolean active;
}
