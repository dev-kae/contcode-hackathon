package br.com.ideaconquer.api.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AgentCollectorMessageRequest {
    private String message;
    private String sessionSlug;
}
