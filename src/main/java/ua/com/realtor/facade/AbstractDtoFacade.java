package ua.com.realtor.facade;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.BaseEntity;
import ua.com.realtor.service.AbstractBaseEntityService;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.stream.Collectors;

@Component
public abstract class AbstractDtoFacade<I extends BaseDto, O extends BaseDto, E extends BaseEntity>
    implements DtoFacade<I, O, E> {

  @Autowired
  protected ModelMapper modelMapper;

  @Autowired
  private AbstractBaseEntityService<E> entityService;

  @Override
  @SuppressWarnings("unchecked")
  public O entityToDto(E entity) {
    if (entity == null) {
      return null;
    }
    return modelMapper.map(entity, (Class<O>) ((ParameterizedType) getClass()
        .getGenericSuperclass()).getActualTypeArguments()[1]);
  }

  protected List<O> entitiesToDtoList(List<E> entities) {
    return entities.stream()
        .map(this::entityToDto)
        .collect(Collectors.toList());
  }

  @SuppressWarnings("unchecked")
  @Override
  public E dtoToEntity(I dto) {
    if (dto == null) {
      return null;
    }
    return modelMapper.map(dto, (Class<E>) ((ParameterizedType) getClass()
        .getGenericSuperclass()).getActualTypeArguments()[2]);
  }

  protected List<E> dtosToEntityList(List<I> dtos) {
    return dtos.stream()
        .map(this::dtoToEntity)
        .collect(Collectors.toList());
  }

  @Override
  public List<O> getAll() {
    return entitiesToDtoList(entityService.getAll());
  }

  @Override
  public O findById(long id) {
    return entityToDto(entityService.findById(id));
  }

  @Override
  public O create(I entity) {
    return entityToDto(entityService.create(dtoToEntity(entity)));
  }
}
