package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.MetroRequest;
import ua.com.realtor.dto.response.MetroResponse;
import ua.com.realtor.entity.Metro;
import ua.com.realtor.service.MetroService;

import java.util.List;

@Component
public class MetroFacade extends AbstractDtoFacade<MetroRequest, MetroResponse, Metro> {

  private final MetroService metroService;

  @Autowired
  public MetroFacade(MetroService metroService) {
    this.metroService = metroService;
  }

  @Override
  public List<MetroResponse> getAll() {
    return entitiesToDtoList(metroService.getAll());
  }
}
