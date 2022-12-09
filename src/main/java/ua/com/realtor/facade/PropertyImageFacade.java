package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import ua.com.realtor.dto.request.PropertyImageRequest;
import ua.com.realtor.dto.response.PropertyImageResponse;
import ua.com.realtor.entity.PropertyImage;
import ua.com.realtor.service.PropertyImageService;

import java.util.List;

@Component
public class PropertyImageFacade extends AbstractDtoFacade<PropertyImageRequest, PropertyImageResponse, PropertyImage> {
  private final PropertyImageService propertyImageService;

  @Autowired
  public PropertyImageFacade(PropertyImageService propertyImageService) {
    this.propertyImageService = propertyImageService;
  }

  public List<PropertyImageResponse> uploadImages(Long id, MultipartFile[] files) {
    return entitiesToDtoList(propertyImageService.uploadImages(id, files));
  }
}
