package ua.com.realtor.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "favorites")
@ToString(exclude = "favorites")
public class User extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "fk_role_id")
  Role roleId;

  @ManyToMany
  @JoinTable(
      name = "user_ads_favorites",
      joinColumns = @JoinColumn(name = "fk_ad_id"),
      inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
  List<Ad> favorites = new ArrayList<>();


  private String fullName;
  @Column(unique = true)
  private String phone;
  private String avatar;
  private String occupation;
  @Column(name = "is_smoker")
  private boolean isSmoker;
  @Column(name = "is_working")
  private boolean isWorking;
  @Column(name = "is_phone_visible")
  private boolean isPhoneVisible;
  private String password;
  private String responseRate;

}
