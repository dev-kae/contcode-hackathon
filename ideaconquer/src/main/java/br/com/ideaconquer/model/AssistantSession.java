package br.com.ideaconquer.model;

import br.com.ideaconquer.model.commons.AbstractEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "assistant_sessions")
@Getter
@Setter
public class AssistantSession extends AbstractEntity {
    @Column(name = "thread_id")
    private String threadId;

    @Column(name = "assistant_id")
    private String assistantId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "assistant_response", columnDefinition = "MEDIUMTEXT")
    @Lob
    private String assistantResponse;

    @Column(name = "active", nullable = false)
    private boolean active = false;
}
