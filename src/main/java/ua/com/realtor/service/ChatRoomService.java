package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.ChatRoom;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.ChatMessageRepository;
import ua.com.realtor.repository.ChatRoomRepository;
import ua.com.realtor.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatRoomService extends AbstractBaseEntityService<ChatRoom> {

  private final ChatRoomRepository chatRoomRepository;
  private final ChatMessageRepository chatMessageRepository;
  private final UserRepository userRepository;

  @Autowired
  public ChatRoomService(ChatRoomRepository chatRoomRepository,
                         ChatMessageRepository chatMessageRepository,
                         UserRepository userRepository) {
    this.chatRoomRepository = chatRoomRepository;
    this.chatMessageRepository = chatMessageRepository;
    this.userRepository = userRepository;
  }

  public ChatRoom getChatId(Long senderId, Long recipientId) {
    ChatRoom room = chatRoomRepository.findBySides(senderId, recipientId);
    if (room == null) {
      User sender = userRepository.getOne(senderId);
      User receiver = userRepository.getOne(recipientId);
      room = chatRoomRepository.save(new ChatRoom(sender, receiver, null));
    }
    return room;
  }

  public List<ChatRoom> getUserRooms() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException("Access denied");
    } else {
      List<Long> roomIds = chatMessageRepository.findLatestChatRooms(user.getId());
      List<ChatRoom> rooms = new ArrayList<>();
      roomIds.forEach(roomId -> chatRoomRepository.findById(roomId).ifPresent(rooms::add));
      return rooms;
    }

  }


}
