package br.com.ideaconquer.service;

import br.com.ideaconquer.feign.assistant.OpenAiClient;
import br.com.ideaconquer.feign.assistant.request.GenerateImageRequest;
import br.com.ideaconquer.model.AssistantSession;
import br.com.ideaconquer.model.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AgentLogoService {

    private final OpenAiClient openAiClient;

    @Transactional
    public List<String> generateLogo() {
        User user = User.currentUser();
        AssistantSession agentCollectorSession = user.getAgentCollectorSession();
        String prompt = "make a logo for a following company: " + agentCollectorSession.getAssistantResponse();
        Integer quantity = 1;
        ResponseEntity<List<String>> response = openAiClient.generateImage(new GenerateImageRequest(
                prompt,
                quantity));
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException();
        }
        return response.getBody();
    }
}
