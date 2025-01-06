package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.dto.response.MessageListResponseDTO;
import com.healthcare.healthcare.model.Message;
import com.healthcare.healthcare.service.chatService.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private ChatService chatService;

    // Get messages by room ID
    @GetMapping("/room/{roomId}")
    public ResponseEntity<MessageListResponseDTO> getMessagesByRoomId(@PathVariable Long roomId) {
        return chatService.getMessagesByRoomId(roomId);
    }

    // Save a new message
    @PostMapping
    public ResponseEntity<Message> saveMessage(@RequestBody Message message) {
        return chatService.saveMessage(message);
    }

    // Delete a message by ID
    @DeleteMapping("/{messageId}")
    public void deleteMessage(@PathVariable Long messageId) {
        chatService.deleteMessage(messageId);
    }

    // Update a message
    @PutMapping("/{messageId}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long messageId, @RequestBody Message updatedMessage) {
        return chatService.updateMessage(messageId, updatedMessage);
    }
}
