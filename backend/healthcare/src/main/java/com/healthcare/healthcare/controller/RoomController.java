package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.dto.response.RoomListResponseDTO;
import com.healthcare.healthcare.model.Room;
import com.healthcare.healthcare.service.chatService.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private ChatService chatService;

    // Get all rooms
    @GetMapping
    public ResponseEntity<?> getAllRooms() {
        return chatService.getAllRooms();
    }

    // Get room by ID
    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long roomId) {
        return chatService.getRoomById(roomId);
    }

    // Create a new room
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return chatService.createRoom(room);
    }

    // Delete a room
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        return chatService.deleteRoom(roomId);
    }

    // Search rooms by keyword
    @GetMapping("/search")
    public ResponseEntity<RoomListResponseDTO> searchRooms(@RequestParam String keyword) {
        return chatService.searchRooms(keyword);
    }
}
