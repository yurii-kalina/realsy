package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Metro;
import ua.com.realtor.repository.MetroRepository;

import java.util.List;

@Service
public class MetroService extends AbstractBaseEntityService<Metro> {
  private final MetroRepository metroRepository;

  @Autowired
  public MetroService(MetroRepository metroRepository) {
    this.metroRepository = metroRepository;
  }

  @Override
  public List<Metro> getAll() {
    return metroRepository.findAll();
  }

}
