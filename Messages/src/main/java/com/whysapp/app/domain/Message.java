package com.whysapp.app.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {

    @Id
    @GeneratedValue
    private Long id;
    private String message;
    private LocalDateTime sentAt;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    public Conversation conversation;
}
