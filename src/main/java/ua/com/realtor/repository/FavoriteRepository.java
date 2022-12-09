package ua.com.realtor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.Favorite;

import java.util.List;

@Repository
public interface FavoriteRepository extends BaseEntityRepository<Favorite> {

  Page<Favorite> findAllByUserId(Pageable pageable, Long id);

  Page<Favorite> findAllByUserIdAndPropertyIsNull(Pageable pageable, Long id);

  Page<Favorite> findAllByUserIdAndAdIsNull(Pageable pageable, Long id);


  @Query(value = "select ad_id from favorites where property_id is null and user_id = ?1", nativeQuery = true)
  List<Long> findAdsByUserId(Long id);

  @Query(value = "select property_id from favorites where ad_id is null and user_id = ?1", nativeQuery = true)
  List<Long> findPropertiesByUserId(Long id);

  Favorite findByUserIdAndAdIdAndPropertyId(Long userId, Long adId, Long propertyId);

  Favorite deleteByAdId(Long id);

  Favorite deleteByPropertyId(Long id);
}
