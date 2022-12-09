package ua.com.realtor.service;

import org.springframework.data.domain.Page;

public interface ISimpleCrud<T> {
  T findById(long id);

  Page<T> findAll(int page, int size);

  T create(T obj);

  T update(T obj);

  void deleteById(long id);

  void deleteByUser(T obj);
}
