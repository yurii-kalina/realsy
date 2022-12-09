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
@Table(name = "property_categories")
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyCategory extends BaseEntity {
  @ManyToMany
  @JoinTable(
      name = "property_category_configuration",
      joinColumns = @JoinColumn(name = "fk_category_id"),
      inverseJoinColumns = @JoinColumn(name = "fk_configuration_id"))
  List<Configuration> configurations = new ArrayList<>();

  private String name;
  private String icon;
  private long priority;

  @ManyToOne
  @JoinColumn(name = "fk_type_id")
  private PropertyType propertyType;

}

