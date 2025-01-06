package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.ChatbotRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatbotRoomRepo extends JpaRepository<ChatbotRoom, Long> {
}
