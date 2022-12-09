package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.ChatMessageRequest;
import ua.com.realtor.dto.request.ChatRoomRequest;
import ua.com.realtor.dto.response.ChatMessageResponse;
import ua.com.realtor.dto.response.ChatRoomResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.entity.ChatMessage;
import ua.com.realtor.entity.ChatRoom;
import ua.com.realtor.entity.Notification;
import ua.com.realtor.entity.NotificationPojo;
import ua.com.realtor.entity.User;
import ua.com.realtor.entity.enums.NotificationType;
import ua.com.realtor.facade.ChatMessageFacade;
import ua.com.realtor.facade.ChatRoomFacade;
import ua.com.realtor.service.ChatMessageService;
import ua.com.realtor.service.ChatRoomService;
import ua.com.realtor.service.NotificationService;
import ua.com.realtor.service.UserService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/chat")
public class ChatController {

  @Autowired
  private SimpMessagingTemplate messagingTemplate;
  @Autowired
  private ChatMessageService chatMessageService;
  @Autowired
  private ChatRoomService chatRoomService;
  @Autowired
  private ChatRoomFacade chatRoomFacade;
  @Autowired
  private ChatMessageFacade chatMessageFacade;
  @Autowired
  private UserService userService;
  @Autowired
  private NotificationService notificationService;

  @MessageMapping("/chat")
  @JsonView(Views.Notification.class)
  public void processMessage(@Payload ChatMessage chatMessage) {
    long senderId = chatMessage.getSender().getId();
    long recipientId = chatMessage.getRecipient().getId();
    ChatRoom room = chatRoomService.getChatId(senderId, recipientId);
    User recipient = userService.findById(recipientId);
    User sender = userService.findById(senderId);
    if (recipient != null && sender != null) {
      chatMessage.setSender(sender);
      chatMessage.setRecipient(recipient);
      chatMessage.setChatRoom(room);
      Notification notification = new Notification();
      notification.setUser(recipient);
      notification.setType(NotificationType.CHAT);
      Notification savedNotification = notificationService.create(notification);
      messagingTemplate.convertAndSendToUser(
          Long.toString(recipientId), "/notifications",
          NotificationPojo.builder()
              .id(savedNotification.getId())
              .status(savedNotification.getStatus())
              .user(savedNotification.getUser().getId())
              .type(savedNotification.getType())
              .entity(ChatMessage.class.getName().toLowerCase())
              .entityId(chatMessage.getId())
              .entityName(recipient.getFullName())
              .build());
      chatMessageService.save(chatMessage);
    }
  }


  @GetMapping("/messages/{senderId}/{recipientId}/count")
  public ResponseEntity<Long> countNewMessages(
      @PathVariable long senderId,
      @PathVariable long recipientId) {

    return ResponseEntity
        .ok(chatMessageService.countNewMessages(senderId, recipientId));
  }

  @GetMapping("/messages/{senderId}/{recipientId}")
  public ResponseEntity<List<ChatMessage>> findChatMessages(@PathVariable long senderId,
                                                            @PathVariable long recipientId) {
    return ResponseEntity
        .ok(chatMessageService.findChatMessages(senderId, recipientId));
  }

  @GetMapping("/messages/{id}")
  public ResponseEntity<ChatMessage> findMessage(@PathVariable long id) {
    return ResponseEntity
        .ok(chatMessageService.findById(id));
  }

  @GetMapping
  @JsonView(Views.ChatRooms.class)
  public List<ChatRoomResponse> findLatestRooms() {
    return chatRoomFacade.getLatestRooms();
  }

  @PostMapping
  @JsonView(Views.ChatMessage.class)
  public ChatRoomResponse findMessages(@RequestBody ChatRoomRequest request) {
    return chatRoomFacade.findById(request.getId());
  }

  @PostMapping("/message")
  @JsonView(Views.ChatMessage.class)
  public ChatMessageResponse sendMessage(@RequestBody ChatMessageRequest request) {
    return chatMessageFacade.sendMessage(request);
  }

  @PostMapping("/proposition")
  @JsonView(Views.PropositionChat.class)
  public ChatMessageResponse sendPropositionMessage(@RequestBody ChatMessageRequest request) {
    return chatMessageFacade.sendMessage(request);
  }
}
