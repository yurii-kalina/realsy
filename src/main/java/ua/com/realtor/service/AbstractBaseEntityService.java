package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.BaseEntity;
import ua.com.realtor.repository.BaseEntityRepository;

import javax.persistence.EntityNotFoundException;
import java.lang.reflect.ParameterizedType;
import java.util.List;

@Service
public abstract class AbstractBaseEntityService<E extends BaseEntity> implements BaseEntityService<E> {
  protected static final String ENTITY_ID_NOT_FOUND = "Cannot find %s with id %d";

  @Autowired
  protected BaseEntityRepository<E> baseEntityRepository;

  @Override
  public E findById(long id) {
    return baseEntityRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException(String.format(ENTITY_ID_NOT_FOUND, getEntityName(), id)));
  }

  @Override
  public List<E> getAll() {
    return baseEntityRepository.findAll();
  }

  @SuppressWarnings("unchecked")
  protected String getEntityName() {
    return ((Class<E>) ((ParameterizedType) getClass().getGenericSuperclass())
        .getActualTypeArguments()[0]).getSimpleName().toLowerCase();
  }

  @Override
  public E create(E entity) {
    return baseEntityRepository.save(entity);
  }
}
