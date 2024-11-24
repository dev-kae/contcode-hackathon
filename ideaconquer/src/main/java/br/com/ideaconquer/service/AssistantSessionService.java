package br.com.ideaconquer.service;

import br.com.ideaconquer.exception.EntityNotFoundException;
import br.com.ideaconquer.model.AssistantSession;
import br.com.ideaconquer.model.User;
import br.com.ideaconquer.repository.AssistantSessionRepository;
import io.github.sashirestela.openai.SimpleOpenAI;
import io.github.sashirestela.openai.domain.assistant.ThreadRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class AssistantSessionService {
    private final AssistantSessionRepository assistantSessionRepository;

    private final SimpleOpenAI simpleOpenAI;

    @Transactional
    public AssistantSession createAssistantSession(String assistantId) {
        log.info("Creating OpenAiConversationSession");
        AssistantSession assistantSession = new AssistantSession();
        String threadId = simpleOpenAI.threads()
                .create(ThreadRequest.builder()
                        .build())
                .join()
                .getId();
        assistantSession.setThreadId(threadId);
        assistantSession.setAssistantId(assistantId);
        assistantSession.setUser(User.currentUser());
        assistantSession.setActive(true);
        AssistantSession savedAssistantSession = assistantSessionRepository.save(assistantSession);
        log.info("OpenAiConversationSession created");
        return savedAssistantSession;
    }

    public AssistantSession findAssistantBySlug(String sessionSlug) {
        return assistantSessionRepository.findBySlugAndActiveTrue(sessionSlug).orElseThrow(EntityNotFoundException::new);
    }
}
