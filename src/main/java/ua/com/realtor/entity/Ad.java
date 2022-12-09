package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import ua.com.realtor.entity.enums.DealType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "ad")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "values")
@ToString(exclude = "values")
public class Ad extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "fk_user_id")
  User user;


  @OneToOne
  private PropertyCategory propertyCategory;

  @Column(columnDefinition = "text")
  private String description;
  private int saved;
  private String number;
  private int replies;
  private int views;
  private boolean active;
  private double price;

  @OneToOne
  @JoinColumn(name = "location_id")
  private Location location;

  @OneToMany(mappedBy = "ad")
  private List<SubmittedValue> values;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "type", columnDefinition = "ENUM('RENT', 'BUY')")
  private DealType type;
}
