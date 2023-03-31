package com.messagingapp.app.resource;

import com.messagingapp.app.domain.Conversation;
import com.messagingapp.app.domain.Message;
import com.messagingapp.app.service.ConversationService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/conversation")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping("/conversations")
    public List<Conversation> allConversation() {
        return conversationService.allConversation();
    }

    @GetMapping("/{id}")
    public EntityModel<Conversation> oneConversation(@PathVariable Long id) {
        return conversationService.oneConversation(id);
    }

    // Returns List of Messages for conversation
    // Move to message controller 
    @GetMapping("/messages/{id}")
    public List<Message> messages(@PathVariable Long id) {
        return conversationService.messages(id);
    }

    @PostMapping()
    public ResponseEntity<?> addConversation(@RequestBody Conversation conversation) {
        return conversationService.addConversation(conversation);
    }

    // Move to message contoller
    @PostMapping("/new-message")
    public ResponseEntity<?> addMessage(@RequestBody Message message) {
        return conversationService.addMessage(message);
    }

}
