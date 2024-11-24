package br.com.ideaconquer.api.response;

import br.com.ideaconquer.model.AssistantSession;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssistantSessionResponse {
    private String sessionSlug;

    public AssistantSessionResponse(AssistantSession assistantSession) {
        this.sessionSlug = assistantSession.getSlug();
    }
}
