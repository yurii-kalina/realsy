package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class SubmittedValueResponse extends BaseDto {
  @JsonView({Views.Propositions.class, Views.PropositionList.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class})
  private ConfigurationResponse configuration;

  @JsonView({Views.Propositions.class, Views.PropositionList.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class})
  private ConfigurationValueResponse configurationValue;

  @JsonView({Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private Double valueNumber;

  @JsonView({Views.Propositions.class, Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private double numberFrom;

  @JsonView({Views.Propositions.class, Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private double numberTo;

  @JsonView({Views.Propositions.class, Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private Date dateFrom;

  @JsonView({Views.Propositions.class, Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private Date dateTo;

  @JsonView({Views.Propositions.class, Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private Boolean isOptional;

  @JsonView({Views.Propositions.class, Views.AdList.class, Views.Ad.class, Views.Property.class, Views.Propositions.class})
  private String icon;
}
