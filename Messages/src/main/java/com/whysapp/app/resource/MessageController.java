package com.whysapp.app.resource;

import com.whysapp.app.domain.Message;
import com.whysapp.app.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/messages")
    public CollectionModel<EntityModel<Message>> allMessage() {
        return messageService.allMessage();
    }

    @GetMapping("/{id}")
    public EntityModel<Message> oneMessage(@PathVariable Long id) {
        return messageService.oneMessage(id);
    }

    @PostMapping()
    public ResponseEntity<?> addMessage(Message message) {
        return messageService.addMessage(message);
    }
}
