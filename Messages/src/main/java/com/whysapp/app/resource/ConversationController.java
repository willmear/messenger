package com.whysapp.app.resource;

import com.whysapp.app.domain.Conversation;
import com.whysapp.app.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/conversation")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping("/conversations")
    public CollectionModel<EntityModel<Conversation>> allConversation() {
        return conversationService.allConversation();
    }

    @GetMapping("/{id}")
    public EntityModel<Conversation> oneConversation(@PathVariable Long id) {
        return conversationService.oneConversation(id);
    }

    @PostMapping()
    public ResponseEntity<?> addConversation(Conversation conversation) {
        return conversationService.addConversation(conversation);
    }
}
