package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "configurations")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "values")
@ToString(exclude = "values")

public class Configuration extends BaseEntity {

  private String name;
  private String icon;
  private long priority;
  private String unit;
  private double weight;

  @Column(name = "is_icon_large")
  private boolean isIconLarge;

  @Column(name = "is_special")
  private boolean isSpecial;

  @Column(name = "is_header")
  private boolean isHeader;

  @ManyToOne
  @JoinColumn(name = "fk_category_id")
  private ConfigurationCategory category;

  @ManyToOne
  @JoinColumn(name = "fk_type_id")
  private ConfigurationType type;

  @OneToMany(mappedBy = "configuration", fetch = FetchType.LAZY)
  private List<ConfigurationValue> values = new ArrayList<>();
}
