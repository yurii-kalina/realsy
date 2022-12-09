package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.ChatRoomRequest;
import ua.com.realtor.dto.response.ChatRoomResponse;
import ua.com.realtor.entity.ChatRoom;
import ua.com.realtor.service.ChatRoomService;

import java.util.List;

@Component
public class ChatRoomFacade extends AbstractDtoFacade<ChatRoomRequest, ChatRoomResponse, ChatRoom> {

  private final ChatRoomService chatRoomService;

  @Autowired
  public ChatRoomFacade(ChatRoomService chatRoomService) {
    this.chatRoomService = chatRoomService;
  }

  public List<ChatRoomResponse> getLatestRooms() {
    return entitiesToDtoList(chatRoomService.getUserRooms());
  }
}
