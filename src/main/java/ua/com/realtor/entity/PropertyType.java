package ua.com.realtor.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "property_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true, exclude = "categories")
@ToString(exclude = "categories")
public class PropertyType extends BaseEntity {
  private String name;
  private long priority;
  @OneToMany(mappedBy = "propertyType")
  private List<PropertyCategory> categories;
}
