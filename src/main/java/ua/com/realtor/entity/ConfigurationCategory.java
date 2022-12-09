package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "configuration_categories")
@Data
@EqualsAndHashCode(callSuper = true)
public class ConfigurationCategory extends BaseEntity {
  private String name;
  private String icon;
  private long priority;

  @Column(name = "is_detailed")
  private boolean isDetailed;

  @Column(name = "is_only_for_rent")
  private boolean isOnlyForRent;
}
