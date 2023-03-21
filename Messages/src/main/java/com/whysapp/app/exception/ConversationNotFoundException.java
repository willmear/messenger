package com.whysapp.app.exception;

public class ConversationNotFoundException extends RuntimeException{

    public ConversationNotFoundException(Long id) {
        super("Could not find conversation " + id);
    }
}
