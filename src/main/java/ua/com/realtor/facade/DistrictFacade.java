package ua.com.realtor.facade;

import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.DistrictRequest;
import ua.com.realtor.dto.response.DistrictResponse;
import ua.com.realtor.entity.District;

@Component
public class DistrictFacade extends AbstractDtoFacade<DistrictRequest, DistrictResponse, District> {
}
