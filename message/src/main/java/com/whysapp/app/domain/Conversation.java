package com.whysapp.app.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Conversation {

    @Id
    @GeneratedValue
    private Long id;
    private String sender;
    private String recipient;

    @OneToMany(mappedBy = "conversation")
    private List<Message> messages;

}
