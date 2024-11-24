package br.com.ideaconquer.service;

import br.com.ideaconquer.feign.assistant.OpenAiClient;
import io.github.sashirestela.openai.SimpleOpenAI;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AgentAssistantService {

    private final OpenAiClient openAiClient;
    private final SimpleOpenAI simpleOpenAI;

    @Transactional
    public Object sendMessage(String message) {
        return "";
    }
}
