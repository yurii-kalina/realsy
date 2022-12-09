package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cities")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "metros")
@ToString(exclude = "metros")
public class City extends BaseEntity {
  private String name;

  @OneToMany(mappedBy = "city")
  private List<Metro> metros = new ArrayList<>();

  @OneToMany(mappedBy = "city")
  private List<District> districts = new ArrayList<>();

}
