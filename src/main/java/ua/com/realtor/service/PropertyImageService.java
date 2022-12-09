package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.realtor.entity.Property;
import ua.com.realtor.entity.PropertyImage;
import ua.com.realtor.repository.PropertyImageRepository;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyImageService extends AbstractBaseEntityService<PropertyImage> {
  private final PropertyImageRepository propertyImageRepository;
  private final AwsS3ServiceImpl aws;
  private final PropertyService propertyService;

  @Autowired
  public PropertyImageService(PropertyImageRepository propertyImageRepository, AwsS3ServiceImpl aws,
                              PropertyService propertyService) {
    this.propertyImageRepository = propertyImageRepository;
    this.aws = aws;
    this.propertyService = propertyService;
  }

  public List<PropertyImage> uploadImages(Long id, MultipartFile[] files) {
    List<PropertyImage> propertyImages = new ArrayList<>();
    Property property = propertyService.findById(id);
    if (property == null) {
      throw new EntityNotFoundException();
    }
    for (MultipartFile file : files) {
      String url = aws.uploadFile(file);
      propertyImages.add(propertyImageRepository.save(new PropertyImage(url, property)));
    }
    return propertyImages;
  }


}
