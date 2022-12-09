package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@SqlResultSetMapping(name = "AdRelevanceMapping",
    classes = @ConstructorResult(
        targetClass = PropertyAdRelevance.class,
        columns = {@ColumnResult(name = "ad_id", type = Long.class),
            @ColumnResult(name = "relevance", type = Double.class)}
    ))
@NamedNativeQuery(
    name = "Property.getAdsRelevance",
    query = "CALL get_adsRelevance_by_propertyId(?1)",
    resultClass = PropertyAdRelevance.class,
    resultSetMapping = "AdRelevanceMapping")
@Table(name = "properties")
@Data
@EqualsAndHashCode(callSuper = true)
public class Property extends BaseEntity {

  @OneToOne
  @JoinColumn(name = "locations_id")
  Location location;

  @ManyToOne
  @JoinColumn(name = "property_category_id")
  PropertyCategory propertyCategory;

  @ManyToOne
  @JoinColumn(name = "user_id")
  User user;


  @Column(name = "is_available_for_sale")
  private boolean isAvailableForSale;

  @Column(name = "is_active")
  private boolean isActive;

  @Column(name = "is_available_for_rent")
  private boolean isAvailableForRent;

  @Column(name = "is_available_for_immediate_arrival")
  private boolean isAvailableForImmediateArrival;

  @Column(name = "date_of_arrival")
  private Date dateOfArrival;

  private String name;

  @OneToMany(mappedBy = "property")
  private List<SubmittedValue> values = new ArrayList<>();

  private double price;

  @OneToMany(mappedBy = "property")
  private List<PropertyImage> images = new ArrayList<>();

  @Column(columnDefinition = "text")
  private String description;
}
