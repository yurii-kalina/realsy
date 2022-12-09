package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.PropositionRequest;
import ua.com.realtor.dto.response.PropositionResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.PropositionFacade;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static ua.com.realtor.constant.ApiConstants.TOTAL_COUNT;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/propositions")

public class PropositionsController {
  private final PropositionFacade propositionFacade;

  @Autowired
  public PropositionsController(PropositionFacade propositionFacade) {
    this.propositionFacade = propositionFacade;
  }

  @GetMapping("/user/received")
  @JsonView(Views.PropertyList.class)
  public List<PropositionResponse> getUserReceivedPropositions(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "8") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<PropositionResponse> propositions = propositionFacade.findReceived(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(propositions.getTotalPages()));
    return propositions.getContent();
  }

  @GetMapping("/user/sent")
  @JsonView(Views.AdList.class)
  public List<PropositionResponse> getUserSentPropositions(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "8") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<PropositionResponse> propositions = propositionFacade.findSent(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(propositions.getTotalPages()));
    return propositions.getContent();
  }

  @GetMapping("/{id}")
  @JsonView(Views.Propositions.class)
  public PropositionResponse getPropositionsById(@PathVariable Long id) {
    return propositionFacade.findById(id);
  }


  @PostMapping
  @JsonView(Views.Propositions.class)
  public PropositionResponse create(@RequestBody PropositionRequest propositionRequest) {
    return propositionFacade.create(propositionRequest);
  }

  @PostMapping("/{id}")
  @JsonView(Views.Propositions.class)
  public PropositionResponse update(@PathVariable Long id, @RequestBody PropositionRequest propositionRequest) {
    return propositionFacade.update(id, propositionRequest);
  }


}
