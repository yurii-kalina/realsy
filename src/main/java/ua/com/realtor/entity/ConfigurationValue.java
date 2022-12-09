package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "configuration_values")
@Data
@ToString(exclude = "configuration")
@EqualsAndHashCode(callSuper = true, exclude = "configuration")

public class ConfigurationValue extends BaseEntity {

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "fk_configuration_id")
  Configuration configuration;

  private String valueText;
  private Double valueNumber;

  private String icon;
  @Column(name = "is_icon_large")
  private Boolean isIconLarge;

  @Column(name = "icon_width")
  private Double iconWidth;
}
