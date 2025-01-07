package com.healthcare.healthcare.service.ChatbotService;

import com.healthcare.healthcare.model.ChatbotRoom;
import com.healthcare.healthcare.repo.ChatbotRoomRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ChatbotService {

    @Autowired
    private ChatbotRoomRepo chatbotRoomRepo;

    public ResponseEntity<ChatbotRoom> createChatbotRoom(Long userId) {
        try {
            ChatbotRoom chatbotRoom = new ChatbotRoom();
            chatbotRoom.setUserId(userId);
            return new ResponseEntity<>(chatbotRoomRepo.save(chatbotRoom), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
