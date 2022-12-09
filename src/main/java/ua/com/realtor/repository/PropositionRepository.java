package ua.com.realtor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.Proposition;

@Repository
public interface PropositionRepository extends BaseEntityRepository<Proposition> {

  Page<Proposition> findAllByProperty_UserId(Pageable page, Long id);

  Page<Proposition> findAllByAd_UserId(Pageable page, Long id);

  Proposition findTopByAd_UserIdAndProperty_UserIdOrderByCreatedAtDesc(Long userId, Long ownerId);
}
