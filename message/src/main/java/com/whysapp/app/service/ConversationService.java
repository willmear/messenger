package com.whysapp.app.service;

import com.whysapp.app.domain.Conversation;
import com.whysapp.app.domain.Message;
import com.whysapp.app.exception.ConversationNotFoundException;
import com.whysapp.app.exception.MessageNotFoundException;
import com.whysapp.app.repository.ConversationRepository;
import com.whysapp.app.repository.MessageRepository;
import com.whysapp.app.resource.ConversationModelAssembler;
import com.whysapp.app.resource.MessageModelAssembler;

import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final ConversationModelAssembler assembler;
    private final MessageModelAssembler messageAssembler;

    public List<Conversation> allConversation() {
        return conversationRepository.findAll();
    }

    public EntityModel<Conversation> oneConversation(Long id) {
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new ConversationNotFoundException(id));
        return assembler.toModel(conversation);
    }

    public ResponseEntity<?> addConversation(Conversation conversation) {

        EntityModel<Conversation> entityModel = assembler.toModel(conversationRepository.save(conversation));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    // Move to message service
    public List<Message> messages(Long id) {

        return messageRepository.findByConversationId(id);
    
    }

    // Move to message service
    public ResponseEntity<?> addMessage(Message message) {

        EntityModel<Message> entityModel = messageAssembler.toModel(messageRepository.save(message));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }
}
