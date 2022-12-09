package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.ChatMessage;
import ua.com.realtor.entity.ChatMessagePojo;
import ua.com.realtor.entity.ChatRoom;
import ua.com.realtor.entity.User;
import ua.com.realtor.entity.enums.MessageStatus;
import ua.com.realtor.exception.ResourceNotFoundException;
import ua.com.realtor.repository.ChatMessageRepository;

import java.util.List;

@Service
public class ChatMessageService extends AbstractBaseEntityService<ChatMessage> {
  private final ChatMessageRepository chatMessageRepository;
  private final UserService userService;
  private final ChatRoomService chatRoomService;
  private final SimpMessagingTemplate messagingTemplate;

  @Autowired
  public ChatMessageService(SimpMessagingTemplate messagingTemplate, ChatMessageRepository chatMessageRepository,
                            ChatRoomService chatRoomService, UserService userService) {
    this.chatMessageRepository = chatMessageRepository;
    this.chatRoomService = chatRoomService;
    this.userService = userService;
    this.messagingTemplate = messagingTemplate;
  }

  public ChatMessage save(ChatMessage chatMessage) {
    chatMessage.setStatus(MessageStatus.SENT);
    chatMessageRepository.save(chatMessage);
    return chatMessage;
  }

  public long countNewMessages(long senderId, long recipientId) {
    return chatMessageRepository.countBySenderIdAndRecipientIdAndStatus(
        senderId, recipientId, MessageStatus.SENT);
  }

  public List<ChatMessage> findChatMessages(long senderId, long recipientId) {
    ChatRoom room = chatRoomService.getChatId(senderId, recipientId);
    if (room != null) {
      var messages = chatMessageRepository.findByChatRoomIdOrderByCreatedAt(room.getId());
      if (!messages.isEmpty()) {
        updateStatuses(senderId, recipientId, MessageStatus.READ);
        return messages;
      }

    }
    throw new ResourceNotFoundException("can't find chat room (sender: " + senderId + "recipient: " + recipientId + ")");
  }

  @Override
  public ChatMessage findById(long id) {
    return chatMessageRepository
        .findById(id)
        .map(chatMessage -> {
          chatMessage.setStatus(MessageStatus.READ);
          return chatMessageRepository.save(chatMessage);
        })
        .orElseThrow(() ->
            new ResourceNotFoundException("can't find message (" + id + ")"));
  }

  public void updateStatuses(long senderId, long recipientId, MessageStatus status) {
    ChatMessage chatMessage = chatMessageRepository.findBySenderIdAndRecipientId(senderId, recipientId);
    chatMessage.setStatus(status);
  }

  public List<ChatMessage> findMessagesByRoomId(Long id) {
    return chatMessageRepository.findByChatRoomIdOrderByCreatedAt(id);
  }

  public ChatMessage sendMessage(Long chatRoom, Long senderId, Long recipientId, String content) {
    ChatMessage chatMessage = new ChatMessage();
    ChatRoom room;
    if (chatRoom == null) {
      room = chatRoomService.getChatId(senderId, recipientId);
    } else {
      room = chatRoomService.findById(chatRoom);
    }
    User sender = userService.findById(senderId);
    User recipient = userService.findById(recipientId);
    chatMessage.setChatRoom(room);
    chatMessage.setRecipient(recipient);
    chatMessage.setSender(sender);
    chatMessage.setContent(content);
    ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
    messagingTemplate.convertAndSendToUser(
        Long.toString(recipientId), "/queue/messages",
        ChatMessagePojo.builder()
            .id(savedMessage.getId())
            .sender(savedMessage.getSender().getId())
            .recipient(savedMessage.getRecipient().getId())
            .content(savedMessage.getContent())
            .status(savedMessage.getStatus())
            .timestamp(savedMessage.getTimestamp())
            .chatRoom(room.getId())
            .avatar(sender.getAvatar())
            .build());
    return savedMessage;
  }
}
