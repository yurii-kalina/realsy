package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.ChatMessageRequest;
import ua.com.realtor.dto.response.ChatMessageResponse;
import ua.com.realtor.entity.ChatMessage;
import ua.com.realtor.service.ChatMessageService;

import java.util.List;

@Component
public class ChatMessageFacade extends AbstractDtoFacade<ChatMessageRequest, ChatMessageResponse, ChatMessage> {

  private final ChatMessageService chatMessageService;

  @Autowired
  public ChatMessageFacade(ChatMessageService chatMessageService) {
    this.chatMessageService = chatMessageService;
  }

  public List<ChatMessageResponse> findMessagesByRoomId(ChatMessageRequest request) {
    Long id = request.getId();
    return entitiesToDtoList(chatMessageService.findMessagesByRoomId(id));
  }

  public ChatMessageResponse sendMessage(ChatMessageRequest request) {
    return entityToDto(chatMessageService
        .sendMessage(request.getChatRoomId(), request.getSenderId(), request.getRecipientId(), request.getContent()));
  }
}
