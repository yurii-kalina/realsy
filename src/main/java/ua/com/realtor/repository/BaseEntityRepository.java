package ua.com.realtor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.BaseEntity;


@Repository
public interface BaseEntityRepository<E extends BaseEntity> extends JpaRepository<E, Long> {
}
