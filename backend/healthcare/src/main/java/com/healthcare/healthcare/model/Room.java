package com.healthcare.healthcare.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "room")
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "created_by_user_id", nullable = false)
    private Long userId;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "summary")
    private String summary;

    @Column(name = "proficiencies", columnDefinition = "TEXT[]")
    private List<String> proficiencies;

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
    }
}
