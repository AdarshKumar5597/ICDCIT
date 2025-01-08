package com.healthcare.healthcare.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "ChatbotMessage")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatbotMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatbot_message_id", nullable = false)
    private Long chatId;

    @Column(name = "chatbot_room_id", nullable = false)
    private Long chatbotRoomId;

    @Column(name = "chatbot_message", columnDefinition = "TEXT")
    private String chatbotMessage;

    @Column(name = "message_type", nullable = false)
    private String messageType;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private Date createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
    }
}