package com.whysapp.app.service;

import com.whysapp.app.domain.Conversation;
import com.whysapp.app.domain.Message;
import com.whysapp.app.exception.MessageNotFoundException;
import com.whysapp.app.repository.MessageRepository;
import com.whysapp.app.resource.ConversationController;
import com.whysapp.app.resource.MessageModelAssembler;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageModelAssembler assembler;

    public CollectionModel<EntityModel<Message>> allMessage() {
        List<EntityModel<Message>> conversations = messageRepository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(conversations,
                linkTo(methodOn(ConversationController.class).allConversation()).withSelfRel());
    }

    public EntityModel<Message> oneMessage(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new MessageNotFoundException(id));

        return assembler.toModel(message);
    }

    public ResponseEntity<?> addMessage(Message message) {
        EntityModel<Message> entityModel = assembler.toModel(messageRepository.save(message));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }
}
