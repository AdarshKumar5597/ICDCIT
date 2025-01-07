package com.healthcare.healthcare.service.chatService;

import com.healthcare.healthcare.dto.response.MessageListResponseDTO;
import com.healthcare.healthcare.dto.response.RoomListResponseDTO;
import com.healthcare.healthcare.model.Message;
import com.healthcare.healthcare.model.Room;
import com.healthcare.healthcare.repo.MessageRepo;
import com.healthcare.healthcare.repo.RoomRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ChatService {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private MessageRepo messageRepo;

    // Fetch all rooms
    public ResponseEntity<RoomListResponseDTO> getAllRooms() {
        try {
            List<Room> rooms = roomRepo.findAllRooms();
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(rooms)
                            .success(true)
                            .message("Rooms fetched successfully.")
                            .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(new ArrayList<>())
                            .success(false)
                            .message("Failed to fetch rooms.")
                            .build(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Fetch room by ID
    public ResponseEntity<Room> getRoomById(Long roomId) {
        try {
            Room room = roomRepo.findByRoomId(roomId);
            if (room != null) {
                return new ResponseEntity<>(room, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Create a new room
    public ResponseEntity<Room> createRoom(Room room) {
        try {
            Room savedRoom = roomRepo.save(room);
            return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a room
    public ResponseEntity<Void> deleteRoom(Long roomId) {
        try {
            if (roomRepo.existsById(roomId)) {
                roomRepo.deleteById(roomId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Search rooms by keyword
    public ResponseEntity<RoomListResponseDTO> searchRooms(String keyword) {
        try {
            List<Room> rooms = roomRepo.searchRoomsByKeyword(keyword);
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(rooms)
                            .success(true)
                            .message("Rooms fetched successfully by keyword.")
                            .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(new ArrayList<>())
                            .success(false)
                            .message("Failed to fetch rooms by keyword.")
                            .build(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Fetch rooms by a single proficiency
    public ResponseEntity<RoomListResponseDTO> getRoomsByProficiency(String proficiency) {
        try {
            List<Room> rooms = roomRepo.findByProficiency(proficiency);
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(rooms)
                            .success(true)
                            .message("Rooms fetched successfully by proficiency.")
                            .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(new ArrayList<>())
                            .success(false)
                            .message("Failed to fetch rooms by proficiency.")
                            .build(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Fetch rooms by a list of proficiencies
    public ResponseEntity<RoomListResponseDTO> getRoomsByProficiencies(List<String> proficiencies) {
        try {
            List<Room> rooms = roomRepo.findByProficiencies(proficiencies);
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(rooms)
                            .success(true)
                            .message("Rooms fetched successfully by proficiencies.")
                            .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RoomListResponseDTO.builder()
                            .roomList(new ArrayList<>())
                            .success(false)
                            .message("Failed to fetch rooms by proficiencies.")
                            .build(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Fetch messages by room ID
    public ResponseEntity<MessageListResponseDTO> getMessagesByRoomId(Long roomId) {
        try {
            List<Message> messages = messageRepo.findByRoomId(roomId);
            return new ResponseEntity<>(
                    MessageListResponseDTO.builder()
                            .messageList(messages)
                            .success(true)
                            .message("Messages fetched successfully.")
                            .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    MessageListResponseDTO.builder()
                            .messageList(new ArrayList<>())
                            .success(false)
                            .message("Failed to fetch messages by room ID.")
                            .build(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Save a message
    public ResponseEntity<Message> saveMessage(Message message) {
        try {
            Message savedMessage = messageRepo.save(message);
            return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update a message
    public ResponseEntity<Message> updateMessage(Long messageId, Message updatedMessage) {
        return messageRepo.findById(messageId)
                .map(existingMessage -> {
                    existingMessage.setMessage(updatedMessage.getMessage());
                    existingMessage.setIsCommand(updatedMessage.getIsCommand());
                    return new ResponseEntity<>(messageRepo.save(existingMessage), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete a message
    public ResponseEntity<Void> deleteMessage(Long messageId) {
        try {
            if (messageRepo.existsById(messageId)) {
                messageRepo.deleteById(messageId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
