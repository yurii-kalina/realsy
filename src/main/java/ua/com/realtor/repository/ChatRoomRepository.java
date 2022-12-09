package ua.com.realtor.repository;

import org.springframework.data.jpa.repository.Query;
import ua.com.realtor.entity.ChatRoom;

public interface ChatRoomRepository extends BaseEntityRepository<ChatRoom> {
  @Query(value = "select * from chat_rooms "
      + "where (sender = ?1 and recipient = ?2) "
      + "or (sender = ?2 and recipient = ?1)", nativeQuery = true)
  ChatRoom findBySides(long senderId, long recipientId);

}
