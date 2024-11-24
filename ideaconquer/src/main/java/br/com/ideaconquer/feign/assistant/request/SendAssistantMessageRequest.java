package br.com.ideaconquer.feign.assistant.request;

import br.com.ideaconquer.model.AssistantSession;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendAssistantMessageRequest {
    @JsonProperty("assistant_id")
    private String assistantId;

    @JsonProperty("thread_id")
    private String threadId;

    private String message;

    public SendAssistantMessageRequest(AssistantSession request, String message) {
        this.assistantId = request.getAssistantId();
        this.threadId = request.getThreadId();
        this.message = message;
    }
}
