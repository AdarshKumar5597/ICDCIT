package com.healthcare.healthcare.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ChatbotRoom")
@Entity
public class ChatbotRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatbot_room_id", nullable = false)
    private Long chatbotRoomId;

    @Column(name = "created_by_user_id", nullable = false)
    private Long userId;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
    }
}