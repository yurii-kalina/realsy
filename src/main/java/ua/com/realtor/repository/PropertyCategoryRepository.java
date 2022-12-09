package ua.com.realtor.repository;

import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.PropertyCategory;

import java.util.List;

@Repository
public interface PropertyCategoryRepository extends BaseEntityRepository<PropertyCategory> {


  List<PropertyCategory> findAllAscByPropertyTypeId(long id);

  List<PropertyCategory> findAllByPropertyTypeIdOrderByPriorityAsc(long id);

  List<PropertyCategory> findAllByOrderByPriorityAsc();
}
