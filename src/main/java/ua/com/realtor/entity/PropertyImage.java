package ua.com.realtor.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "property_images")
@Data
@ToString(exclude = "property")
@EqualsAndHashCode(callSuper = true, exclude = "property")
@AllArgsConstructor
@NoArgsConstructor
public class PropertyImage extends BaseEntity {
  private String url;
  @ManyToOne
  private Property property;
}
