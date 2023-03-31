package com.messagingapp.app.repository;

import com.messagingapp.app.domain.Message;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationId(Long id);
    
}
