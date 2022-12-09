package ua.com.realtor.facade;

import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.BaseEntity;

import java.util.List;

public interface DtoFacade<I extends BaseDto, O extends BaseDto, E extends BaseEntity> {

  O entityToDto(E entity);

  E dtoToEntity(I dto);

  List<O> getAll();

  O findById(long id);

  O create(I entity);
}