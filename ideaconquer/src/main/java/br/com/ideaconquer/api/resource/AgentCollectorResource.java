package br.com.ideaconquer.api.resource;

import br.com.ideaconquer.api.request.AgentCollectorMessageRequest;
import br.com.ideaconquer.api.response.AssistantSessionResponse;
import br.com.ideaconquer.service.AgentCollectorService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agent-collector")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AgentCollectorResource {

    private final AgentCollectorService agentCollectorService;

    @PostMapping("create-session")
    public ResponseEntity<AssistantSessionResponse> createAgentCollectorSession() {
        return ResponseEntity.ok(this.agentCollectorService.createAgentCollectorSession());
    }

    @PostMapping("send-message")
    public ResponseEntity<?> sendMessageToCollector(@RequestBody AgentCollectorMessageRequest agentCollectorMessageRequest) {
        return ResponseEntity.ok(this.agentCollectorService.sendMessageToCollector(agentCollectorMessageRequest));
    }

    @PatchMapping("conclude-collect")
    public ResponseEntity<Void> concludeCollect() {
        this.agentCollectorService.concludeCollect();
        return ResponseEntity.ok().build();
    }
}
