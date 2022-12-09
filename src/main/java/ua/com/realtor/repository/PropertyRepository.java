package ua.com.realtor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.Property;
import ua.com.realtor.entity.PropertyAdRelevance;

import java.util.List;

@Repository
public interface PropertyRepository extends BaseEntityRepository<Property> {
  @Query(nativeQuery = true)
  List<PropertyAdRelevance> getAdsRelevance(Long id);

  Page<Property> findAll(Pageable pageable);

  Page<Property> findAllByUserId(Pageable pageable, Long id);
}
