package ua.com.realtor.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.ChatMessage;
import ua.com.realtor.entity.enums.MessageStatus;

import java.util.List;

@Repository
public interface ChatMessageRepository extends BaseEntityRepository<ChatMessage> {

  long countBySenderIdAndRecipientIdAndStatus(
      long senderId, long recipientId, MessageStatus status);


  ChatMessage findBySenderIdAndRecipientId(long senderId, long recipientId);

  List<ChatMessage> findByChatRoomIdOrderByCreatedAt(Long id);


  @Query(value = "SELECT c.chat_room_id from chat_messages as c  "
      + "where c.sender_id = ?1 OR c.recipient_id = ?1 "
      + "group by c.chat_room_id order by c.created_at desc", nativeQuery = true)
  List<Long> findLatestChatRooms(Long senderId);

}