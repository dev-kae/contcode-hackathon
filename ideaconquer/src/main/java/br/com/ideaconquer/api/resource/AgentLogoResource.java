package br.com.ideaconquer.api.resource;

import br.com.ideaconquer.service.AgentLogoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("logo")
@AllArgsConstructor
public class AgentLogoResource {

    private final AgentLogoService agentLogoService;

    @PostMapping("/generate")
    public ResponseEntity<List<String>> generateLogo() {
        return ResponseEntity.ok(this.agentLogoService.generateLogo());
    }
}
