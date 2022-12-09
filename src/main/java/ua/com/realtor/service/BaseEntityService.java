package ua.com.realtor.service;

import ua.com.realtor.entity.BaseEntity;

import java.util.List;


public interface BaseEntityService<E extends BaseEntity> {

  List<E> getAll();

  E findById(long id);

  E create(E entity);

}
