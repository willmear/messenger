package com.messagingapp.app.resource;

import com.messagingapp.app.domain.Message;
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
