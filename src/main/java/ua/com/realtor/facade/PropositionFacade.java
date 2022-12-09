package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.PropositionRequest;
import ua.com.realtor.dto.response.PropositionResponse;
import ua.com.realtor.entity.Proposition;
import ua.com.realtor.service.PropositionService;

@Component
public class PropositionFacade extends AbstractDtoFacade<PropositionRequest, PropositionResponse, Proposition> {

  private final PropositionService propositionService;

  @Autowired
  public PropositionFacade(PropositionService propositionService) {
    this.propositionService = propositionService;
  }

  @Override
  public PropositionResponse create(PropositionRequest propositionRequest) {
    return entityToDto(propositionService.create(dtoToEntity(propositionRequest)));
  }

  public PropositionResponse update(Long id, PropositionRequest propositionRequest) {
    return entityToDto(propositionService.update(id, dtoToEntity(propositionRequest)));
  }

  public Page<PropositionResponse> findReceived(Pageable pageable) {
    return propositionService.findReceived(pageable)
        .map(proposition -> modelMapper.map(proposition, PropositionResponse.class));
  }

  public Page<PropositionResponse> findSent(Pageable pageable) {
    return propositionService.findSent(pageable).map(proposition -> modelMapper.map(proposition, PropositionResponse.class));
  }
}
