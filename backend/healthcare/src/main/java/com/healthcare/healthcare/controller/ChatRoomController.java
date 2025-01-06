package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.model.ChatbotRoom;
import com.healthcare.healthcare.service.ChatbotService.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("chatbot/")
public class ChatRoomController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("room/create/{userId}")
    public ResponseEntity<ChatbotRoom> create(@PathVariable Long userId) {
        if (Objects.isNull(userId)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return chatbotService.createChatbotRoom(userId);
    }
}
