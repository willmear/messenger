package com.whysapp.app.repository;

import com.whysapp.app.domain.Message;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = "SELECT t FROM message t WHERE t.conversationId = ?1", nativeQuery = true)
    List<Message> findByConversationId(Long id);
    
}
