package br.com.ideaconquer.model;

import br.com.ideaconquer.model.commons.AbstractEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.Collection;
import java.util.List;

@Table(name = "users")
@Entity
@Getter
@Setter
public class User extends AbstractEntity implements UserDetails {

    @Column(name="full_name", nullable = false)
    private String fullName;

    @Column(name="email", unique = true, length = 100, nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "agent_collector_session_id")
    private AssistantSession agentCollectorSession;

    @Column(name = "data_collected", nullable = false)
    private boolean dataCollected;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public static User currentUser(){

        return (User) RequestContextHolder.getRequestAttributes().getAttribute("user", RequestAttributes.SCOPE_REQUEST);
    }


    public static void setCurrentUser(final User user){

        RequestContextHolder.getRequestAttributes().setAttribute("user",user, RequestAttributes.SCOPE_REQUEST);
    }

    public static void deleteCurrentUser(){

        RequestContextHolder.getRequestAttributes().removeAttribute("user", RequestAttributes.SCOPE_REQUEST);
    }
}
