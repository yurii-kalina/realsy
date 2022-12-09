package ua.com.realtor.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.Ad;

@Repository
public interface AdRepository extends BaseEntityRepository<Ad>, PagingAndSortingRepository<Ad, Long> {

  Page<Ad> findAllByUserId(Pageable pageable, Long id);

  Page<Ad> findAll(Pageable pageable);

}
