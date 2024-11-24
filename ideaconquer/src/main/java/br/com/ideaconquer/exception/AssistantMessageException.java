package br.com.ideaconquer.exception;

public class AssistantMessageException extends RuntimeException {
    public AssistantMessageException() {
        super("Error in send message to assistant");
    }
}
