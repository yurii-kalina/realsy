package ua.com.realtor.repository;

import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.PropertyType;

import java.util.List;

@Repository
public interface PropertyTypeRepository extends BaseEntityRepository<PropertyType> {

  List<PropertyType> findAllByOrderByPriorityAsc();
}
