package br.com.ideaconquer.api.resource;

import br.com.ideaconquer.service.AgentAssistantService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("agent-assistant")
@AllArgsConstructor
public class AgentAssistantResource {

    private final AgentAssistantService agentAssistantService;

    @PostMapping("/send-message")
    public ResponseEntity<?> sendMessage(@RequestParam String message) {
        return ResponseEntity.ok(agentAssistantService.sendMessage(message));
    }
}
