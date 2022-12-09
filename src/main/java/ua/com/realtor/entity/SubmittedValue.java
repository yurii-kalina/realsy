package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "submitted_values")
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"ad", "property"})
@ToString(exclude = {"ad", "property"})
public class SubmittedValue extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "ad_id")
  private Ad ad;

  @ManyToOne
  @JoinColumn(name = "property_id")
  private Property property;

  @ManyToOne
  @JoinColumn(name = "configuration_id")
  private Configuration configuration;

  @ManyToOne
  @JoinColumn(name = "configuration_value_id")
  private ConfigurationValue configurationValue;

  @Column(name = "value_boolean")
  private boolean valueBoolean;

  @Column(name = "value_number")
  private double valueNumber;

  @Column(name = "value_text")
  private String valueText;

  @Column(name = "distance_in_meters")
  private double distanceInMeters;

  @Column(name = "number_from")
  private double numberFrom;

  @Column(name = "number_to")
  private double numberTo;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "date_from")
  private Date dateFrom;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "date_to")
  private Date dateTo;

  @Column(name = "is_optional")
  private Boolean isOptional;

  private String icon;

}
