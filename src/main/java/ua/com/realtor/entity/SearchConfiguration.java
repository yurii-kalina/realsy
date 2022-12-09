package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "search_configurations")
@Data
@EqualsAndHashCode(callSuper = true)
public class SearchConfiguration extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "fk_search_id")
  Search searchId;

  @ManyToOne
  @JoinColumn(name = "fk_configurations_id")
  Configuration configurationId;

  @ManyToOne
  @JoinColumn(name = "fk_configuration_value_id")
  ConfigurationValue configurationValueId;

}
