package br.com.ideaconquer.service;

import br.com.ideaconquer.api.request.AgentCollectorMessageRequest;
import br.com.ideaconquer.api.response.AgentCollectorMessageResponse;
import br.com.ideaconquer.api.response.AssistantSessionResponse;
import br.com.ideaconquer.exception.AssistantMessageException;
import br.com.ideaconquer.feign.assistant.OpenAiClient;
import br.com.ideaconquer.feign.assistant.request.SendAssistantMessageRequest;
import br.com.ideaconquer.model.AssistantSession;
import br.com.ideaconquer.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AgentCollectorService {

    private final OpenAiClient openAiClient;
    private final AssistantSessionService assistantSessionService;
    private final UserService userService;

    @Value("${spring.application.assistant.collector.id}")
    private String collectorAssistantId;

    @Transactional
    public AssistantSessionResponse createAgentCollectorSession() {
        User user = User.currentUser();
        if (user.getAgentCollectorSession() != null && user.getAgentCollectorSession().isActive()) {
            user.setAgentCollectorSession(null);
        }
        AssistantSession assistantSession = assistantSessionService.createAssistantSession(collectorAssistantId);
        user.setAgentCollectorSession(assistantSession);
        userService.saveUser(user);
        return new AssistantSessionResponse(assistantSession);
    }

    @Transactional
    public Object sendMessageToCollector(AgentCollectorMessageRequest request) {
        AssistantSession assistantSession = assistantSessionService.findAssistantBySlug(request.getSessionSlug());
        ResponseEntity<?> responseEntity = openAiClient.sendAssistantMessage(new SendAssistantMessageRequest(
                assistantSession,
                request.getMessage()));
        if (!responseEntity.getStatusCode().equals(HttpStatusCode.valueOf(200))) {
            throw new AssistantMessageException();
        }
        String assistantMessageResponse = String.valueOf(responseEntity.getBody());
        assistantSession.setAssistantResponse(assistantMessageResponse);
        return responseEntity.getBody();
    }

    @Transactional
    public void concludeCollect() {
        User user = User.currentUser();
        user.setDataCollected(true);
        userService.saveUser(user);
    }
}
