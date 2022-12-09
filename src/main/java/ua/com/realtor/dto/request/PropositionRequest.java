package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.Ad;
import ua.com.realtor.entity.Property;
import ua.com.realtor.entity.enums.PropositionStatus;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropositionRequest extends BaseDto {
  private Property property;
  private Ad ad;
  private Double ownerPrice;
  private Double clientPrice;
  private PropositionStatus status;
  private Boolean isActive;
}
