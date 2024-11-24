package br.com.ideaconquer.repository;

import br.com.ideaconquer.model.AssistantSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssistantSessionRepository extends JpaRepository<AssistantSession, Long> {
    Optional<AssistantSession> findBySlugAndActiveTrue(String slug);
}
