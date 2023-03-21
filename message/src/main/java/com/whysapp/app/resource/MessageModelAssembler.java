package com.whysapp.app.resource;

import com.whysapp.app.domain.Conversation;
import com.whysapp.app.domain.Message;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class MessageModelAssembler implements RepresentationModelAssembler<Message, EntityModel<Message>> {

    @Override
    public EntityModel<Message> toModel(Message message) {
        return EntityModel.of(message,
                linkTo(methodOn(MessageController.class).oneMessage(message.getId())).withSelfRel(),
                linkTo(methodOn(MessageController.class).allMessage()).withRel("messages"));
    }
}
