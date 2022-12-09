package ua.com.realtor.facade;

import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.CityRequest;
import ua.com.realtor.dto.response.CityMetroLineResponse;
import ua.com.realtor.dto.response.CityResponse;
import ua.com.realtor.dto.response.DistrictResponse;
import ua.com.realtor.dto.response.MetroResponse;
import ua.com.realtor.entity.City;

import java.util.stream.Collectors;

@Component
public class CityFacade extends AbstractDtoFacade<CityRequest, CityResponse, City> {

  public CityMetroLineResponse findByIdByMetroLine(long id) {
    CityResponse response = super.findById(id);
    CityMetroLineResponse cityMetroLineResponse = new CityMetroLineResponse();
    cityMetroLineResponse.setDistricts(response.getDistricts().stream().map(district -> modelMapper.map(district,
        DistrictResponse.class)).collect(Collectors.toList()));
    cityMetroLineResponse
        .setMetros(response.getMetros().stream().collect(Collectors.groupingBy(MetroResponse::getMetroLine)));
    cityMetroLineResponse.setId(response.getId());
    return cityMetroLineResponse;

  }
}
