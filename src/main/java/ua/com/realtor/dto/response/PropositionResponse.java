package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.enums.PropositionStatus;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropositionResponse extends BaseDto {
  @JsonView({Views.PropositionList.class, Views.Propositions.class, Views.ChatRooms.class, Views.PropertyList.class})
  private PropertyResponse property;

  @JsonView({Views.PropositionList.class, Views.AdList.class, Views.Propositions.class})
  private AdResponse ad;

  @JsonView({Views.PropositionList.class, Views.Propositions.class, Views.AdList.class, Views.PropertyList.class})
  private PropositionStatus status;

  @JsonView({Views.PropositionList.class, Views.Propositions.class, Views.AdList.class, Views.PropertyList.class})
  private Double price;

  @JsonView({Views.PropositionList.class, Views.Propositions.class, Views.AdList.class, Views.PropertyList.class})
  private Double ownerPrice;

  @JsonView({Views.PropositionList.class, Views.Propositions.class, Views.AdList.class, Views.PropertyList.class})
  private Double clientPrice;

  @JsonView({Views.PropositionList.class, Views.Propositions.class})
  private Boolean isActive;
}
