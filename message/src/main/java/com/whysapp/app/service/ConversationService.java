package com.whysapp.app.service;

import com.whysapp.app.domain.Conversation;
import com.whysapp.app.exception.ConversationNotFoundException;
import com.whysapp.app.repository.ConversationRepository;
import com.whysapp.app.resource.ConversationController;
import com.whysapp.app.resource.ConversationModelAssembler;
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
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ConversationModelAssembler assembler;

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
}
