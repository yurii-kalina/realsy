package ua.com.realtor.entity;


import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "configuration_types")
@Data
@EqualsAndHashCode(callSuper = true)
public class ConfigurationType extends BaseEntity {
  private String name;
}
