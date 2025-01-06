package com.healthcare.healthcare.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id", nullable = false)
    private Long chatId;

    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "message")
    private String message;

    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    @Column(name = "is_command")
    private Boolean isCommand;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
    }
}
